import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {compare} from 'bcryptjs';
import * as crypto from 'crypto';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import {ApiKeyService} from '../apikeys/apikey.service';
import {ConfigService} from '../config/config.service';
import {CreateUserDto} from '../users/dto/create-user.dto';
import {User} from '../users/user.model';
import {UsersService} from '../users/users.service';

@Injectable()
export class AuthnService {
  constructor(
    private readonly apiKeyService: ApiKeyService,
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    let user: User;
    try {
      user = await this.usersService.findByEmail(email);
    } catch {
      throw new UnauthorizedException('Incorrect Username or Password');
    }
    if (user && (await compare(password, user.encryptedPassword))) {
      this.usersService.updateLoginMetadata(user);
      return user;
    } else {
      return null;
    }
  }

  async validateApiKey(apikey: string): Promise<User | null> {
    const JWTSecret = this.configService.get('JWT_SECRET');
    const apiKeysAllowed =
      this.configService.get('API_KEYS_DISABLED')?.toLowerCase() !== 'true';
    if (apiKeysAllowed && JWTSecret) {
      try {
        const jwtPayload = jwt.verify(apikey, JWTSecret) as {
          token: string;
          keyId: string;
          createdAt: Date;
        };
        const JWTSignature = apikey.split('.')[2];
        if (_.has(jwtPayload, 'keyId')) {
          const matchingKey = await this.apiKeyService.findById(
            jwtPayload.keyId
          );
          if (await compare(JWTSignature, matchingKey.apiKey)) {
            return matchingKey.user;
          } else {
            throw new UnauthorizedException('Unknown API-Key');
          }
        }
      } catch {
        throw new UnauthorizedException('Invalid API-Key Signature');
      }
    } else {
      throw new ForbiddenException('API Keys have been disabled');
    }
    throw new UnauthorizedException('Bad API-Key');
  }

  async validateOrCreateUser(
    email: string,
    firstName: string,
    lastName: string,
    creationMethod: string
  ): Promise<User> {
    let user: User;
    try {
      user = await this.usersService.findByEmail(email);
    } catch {
      const randomPass = crypto.randomBytes(128).toString('hex');
      const createUser: CreateUserDto = {
        email: email,
        password: randomPass,
        passwordConfirmation: randomPass,
        firstName: firstName,
        lastName: lastName,
        organization: '',
        title: '',
        role: 'user',
        creationMethod: creationMethod
      };
      await this.usersService.create(createUser);
      user = await this.usersService.findByEmail(email);
    }

    if (user) {
      // If the users info has changed since they last logged in it will be reflected here.
      // Because we find the user by their email, we can't detect a change in email.
      if (user.firstName !== firstName || user.lastName !== lastName) {
        user.firstName = firstName;
        user.lastName = lastName;
        user.save();
      }
      this.usersService.updateLoginMetadata(user);
    }

    return user;
  }

  async login(user: {
    id: string;
    email: string;
    role: string;
    forcePasswordChange: boolean | undefined;
  }): Promise<{userID: string; accessToken: string}> {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      forcePasswordChange: user.forcePasswordChange
    };
    if (payload.forcePasswordChange) {
      // Give the user 10 minutes to (hopefully) change their password.
      return {
        userID: user.id,
        accessToken: this.jwtService.sign(payload, {expiresIn: '600s'})
      };
    } else {
      return {
        userID: user.id,
        accessToken: this.jwtService.sign(payload)
      };
    }
  }

  splitName(fullName: string): {firstName: string; lastName: string} {
    const nameArray = fullName.split(' ');
    return {
      firstName: nameArray.slice(0, -1).join(' '),
      lastName: nameArray[nameArray.length - 1]
    };
  }

  async testPassword(
    updateUserDto: {currentPassword?: string},
    user: User
  ): Promise<void> {
    try {
      if (
        !(await compare(
          updateUserDto.currentPassword || '',
          user.encryptedPassword
        ))
      ) {
        throw new ForbiddenException('Current password is incorrect');
      }
    } catch {
      throw new ForbiddenException('Current password is incorrect');
    }
  }
}

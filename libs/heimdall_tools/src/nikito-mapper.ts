import { ExecJSON } from 'inspecjs/dist/generated_parsers/v_1_0/exec-json'
import { version as HeimdallToolsVersion } from '../package.json'
import _ from 'lodash'

const objectMap = (obj: Object, fn: Function) =>
  Object.fromEntries(
    Object.entries(obj).map(
      ([k, v], i) => [k, fn(v, k, i)]
    )
  )
type MappedTransform<T, U> = {
  [K in keyof T]: T[K] extends object ? MappedTransform<T[K], U> : T[K] | U;
};
interface LookupPath {
  path: string;
}
function convert(fields: typeof mappings, file: Object) {
  const result = objectMap(fields, (v: { path: string }) => _.get(file, v.path))
  return result
}
async function generateHash(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const encdata = encoder.encode(data);

  const byteArray = await crypto.subtle.digest('SHA-256', encdata)
  return Array.prototype.map.call(new Uint8Array(byteArray), x => (('00' + x.toString(16)).slice(-2))).join('');
}

const mappings: MappedTransform<ExecJSON, LookupPath> = {
  platform: {
    name: 'Heimdall Tools',
    release: HeimdallToolsVersion,
  },
  profiles: [{
    name: 'OWASP ZAP Scan',
    version: '',
    title: `Nikto Target: ${{ path: 'host' }}}`, //Need to add port
    attributes: [],
    controls: [
      {
        tags: {
          nist: { path: 'vulnerabilities[INDEX].id' },
          ösvdb: { path: 'vulnerabilities[INDEX].OSVDB' }
        },
        descriptions: [],
        refs: [],
        source_location: {},
        title: { path: 'vulnerabilities[INDEX].msg' },
        id: { path: 'vulnerabilities[INDEX].id' },
        desc: { path: 'vulnerabilities[INDEX].msg' },
        impact: 0.5,
        code: '',
        results: [] //TODO
      }
    ],
    groups: [],
    summary: `Banner: ${{ path: 'banner' }}`,
    supports: [],
    sha256: ''
  }],
  statistics: {},
  version: { path: ".version" }
}

class NikitoMapper {
  xrayJson: JSON

  constructor(xrayJson: string) {
    this.xrayJson = JSON.parse(xrayJson.split('\n', 1)[1]);
  }
}

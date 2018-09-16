import * as ts_module from "../node_modules/typescript/lib/tsserverlibrary";
import { Type, Symbol, LanguageService } from "../node_modules/typescript/lib/tsserverlibrary";


// export function getStruct(t: Type) {
//     return {
//         ...t.getProperties().reduce((struct, prop) => ({
//             ...struct,
//             [prop.getName()]: getStuct(prop.getDeclarations().map(x => x))
//         }), {})
//     }
// }
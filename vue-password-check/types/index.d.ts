import Vue, { PluginFunction, WatchOptions } from 'vue'
import PasswordChecker from '@codecafe/password-checker'
import { IPasswordCheckerOptions } from '@codecafe/password-checker/types/helpers'

declare module "vue/types/vue" {
    interface Vue {
        readonly $pwc: PasswordChecker
    }
}

declare class VuePasswordChecker {
    static install: PluginFunction<IPasswordCheckerOptions>
    static installed: boolean
}

export default VuePasswordChecker
import PasswordChecker from '@codecafe/password-checker'
import { VueConstructor, PluginFunction } from 'vue/types/umd'

const install: PluginFunction<never> = (Vue: VueConstructor, options) => {
    if (VuePasswordChecker.installed) {
        return;
    }

    const passwordChecker = new PasswordChecker(options)
    VuePasswordChecker.installed = true

    Object.defineProperties(Vue.prototype, {
        $pwc: {
            get() {
                return passwordChecker
            },
        },
    });
};

const VuePasswordChecker = {
    install,
    installed: false
}

export default VuePasswordChecker
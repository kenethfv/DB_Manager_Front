
import { KeycloakService } from "keycloak-angular";

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
    return () =>
        keycloak.init({
            config: {
                url: 'http://localhost:8180/auth',
                realm: 'ProyectoDesarrolloWeb',
                clientId: 'angular-web-client'
            },

            initOptions: {
                checkLoginIframe: true,
                checkLoginIframeInterval: 25,

                //    onLoad: 'check-sso',
                //  silentCheckSsoRedirectUri:
                //    window.location.origin + '/assets/silent-check-sso.html'
            }
        });
}
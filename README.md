# feide2faktor-sveltekit-web
Sveltekit frontend for å sette feide 2-faktor.
## Hvordan begynne å utvikle og kjøre prosjektet lokalt 
1. Klon ned repoet.
2. Installer avhengigheter ved å kjøre kommandoen ``npm i`` i terminalen.
3. Lag en lokal .env fil som vist under.
4. Opprett en ny integrasjon på ``https://selvbetjening-samarbeid-prod.difi.no/integrations`` for produksjon eller ``https://selvbetjening-samarbeid-ver2.difi.no/integrations`` for test.
    1. Sett scopes.
    2. Integrasjonens identifikatoren er den du skal bruke for å identifisere din integrasjon.
    3. Gi integrasjonen et navn og en beskrivelse.
    4. Sett tillatte grant types.
    5. Sett klientautentiseringsmetode
    6. Sett applikasjonstype til ``browser``
    7. Sett gyldige redirect uri-er, logout redirect uri-er, front channel logout uri og tilbake-uri
5. Start prosjektet ved å kjøre ``npm run dev`` i terminalen.

## .ENV

|KEY|VALUE|
|:---|:---|
|VITE_CLIENT_ISS|https://login.microsoftonline.com/XXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXX|
|VITE_CLIENT_ID|XXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXX|
|VITE_REDIRECT_URI|http://localhost:5173/|
|VITE_OIDC_ACR_VALUES|Level3|
|VITE_OIDC_AUTHORITY|https://oidc-ver2.difi.no/idporten-oidc-provider/.well-known/openid-configuration|
|VITE_OIDC_REDIRECT_URI|http://localhost:5173/authenticated/feide|
|VITE_OIDC_SILET_REDIRECT_URI|http://localhost:5173/authenticated/feide|
|VITE_OIDC_CLIENT_ID|XXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXX|
|VITE_OIDC_POST_LOGOUT_REDIRECT_URI|http://localhost:5173/authenticated/feide|
|VITE_OIDC_LOAD_USER_INFO|true|
|VITE_OIDC_APP_SCOPE|openid, profile|
|VITE_OIDC_RESPONSE_TYPE|code|
|VITE_OIDC_ISSUER|https://oidc-ver2.difi.no/idporten-oidc-provider/|
|VITE_OIDC_AUTHORIZATION_ENDPOINT|https://oidc-ver2.difi.no/idporten-oidc-provider/authorize|
|VITE_OIDC_PUSHED_AUTHORIZATION_REQUEST_ENDPOINT|https://oidc-ver2.difi.no/idporten-oidc-provider/par|
|VITE_OIDC_TOKEN_ENDPOINT|https://oidc-ver2.difi.no/idporten-oidc-provider/token|
|VITE_OIDC_END_SESSION_ENDPOINT|https://oidc-ver2.difi.no/idporten-oidc-provider/endsession|
|VITE_OIDV_REVOCATION_ENDPOINT|https://oidc-ver2.difi.no/idporten-oidc-provider/revoke|
|VITE_OIDC_JWKS_URI|https://oidc-ver2.difi.no/idporten-oidc-provider/jwk|
|VITE_OIDV_USERINFO_ENDPOINT|https://oidc-ver2.difi.no/idporten-oidc-provider/userinfo|
|VITE_WEB_URL|http://localhost:5173|
|VITE_API_URL|http://localhost:7071/api|
|VITE_API_SCOPE|api://XXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXX/user_impersonation|
|VITE_API_EXT|extension_XXXXX_XXXXX|
|VITE_OIDCPID_TEST|SSN THAT YOU WANT TO TEST WITH (MUST MATCH MSAL)|

## Hosting
Siden er hostet på vercel. \
Du kan ikke pushe direkte på main branchen, den krever en pull request. \
Merge en pull request til "main" for å publisere endrigene i prod (https://feide2faktor.vtfk.no/).


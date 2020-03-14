# Documentation Client

## Variáveis de Ambiente

|Variável|Descrição|
|--------|---------|
|AWS_ACCESS_KEY_ID|Especifica uma chave de acesso da AWS associada a um usuário.|
|AWS_SECRET_ACCESS_KEY|Especifica a chave secreta associada à chave de acesso.|
|AWS_REGION|Especifica a região da AWS para a qual enviar a solicitação.|

## Comandos

### validate

```sh
documentation-cli validate <input>
```

### bundle

```sh
documentation-cli bundle <input> <output>
```

### prepare

```sh
documentation-cli prepare <dir>
```

### rm

```sh
documentation-cli rm <bucket> <namespace> <service>
```

### cp

```sh
documentation-cli cp <bucket> <namespace> <service> <dir>
```

### sync

```sh
documentation-cli sync <bucket> <namespace> <service> <dir>
```

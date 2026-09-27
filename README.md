# Kraken plugin: bridge

This plugin add ability to use `@kraken` command inside containers to communicate with kraken host.

## Install

```sh
kraken plugins:add https://github.com/kraken-hub/kraken-plugin-bridge/archive/refs/heads/main.zip
```

## Configure

```sh
# Optional: override the bridge binary path (defaults to plugin's bin/@kraken)
echo 'KRAKEN_PLUGIN_BRIDGE_CMD_PATH=/path/to/@kraken' >> ~/.kraken/env

# Optional: add aliases
echo 'KRAKEN_PLUGIN_BRIDGE_CMD_ALIASES=@mytool,@other' >> ~/.kraken/env
```

## Usage

In your container startup script:

```sh
@kraken wait 5s
```

This tells kraken to wait 5 seconds after the directive is printed before considering the container ready.
Requires `wait` to be set in the service config.

## Label

Opt in per service in `kraken.yaml`:

```yaml
labels:
  kraken.plugin.bridge: "true"
```

Set `KRAKEN_PLUGIN_BRIDGE_AUTO_MODE=1` to apply to all containers instead.

## Environment

| Variable | Default | Description |
|---|---|---|
| `KRAKEN_PLUGIN_BRIDGE_AUTO_MODE` | | Set to `1` to apply to all containers (default: label-based) |
| `KRAKEN_PLUGIN_BRIDGE_CMD_PATH` | `bin/@kraken` (plugin dir) | Path to the bridge binary on the host |
| `KRAKEN_PLUGIN_BRIDGE_CMD_ALIASES` | | Comma-separated command aliases (e.g. `@mytool,@other`) |

## License

This software is under the MIT license. See the complete license in:

```
LICENSE
```

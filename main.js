import env from 'kraken/env';

export default function doInit(kraken) {
    const bridgePath = env.get('KRAKEN_PLUGIN_BRIDGE_CMD_PATH') || kraken.pluginDir + '/bin/@kraken';

    const aliases = (env.get('KRAKEN_PLUGIN_BRIDGE_CMD_ALIASES') || '')
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
        .map(s => '/usr/local/bin/' + s)
    ;

    const targets = ['/usr/local/bin/@kraken', ...aliases];

    const autoMode = !!env.get('KRAKEN_PLUGIN_BRIDGE_AUTO_MODE');

    kraken.on('container:create', (event) => {
        const cfg = event.data;

        if (!autoMode && cfg.UserLabels?.['kraken.plugin.bridge'] !== 'true') {
            return;
        }

        for (const target of targets) {
            cfg.Volumes = [...(cfg.Volumes || []), {
                Source: bridgePath,
                Target: target,
                ReadOnly: true,
            }];
        }
    });
}

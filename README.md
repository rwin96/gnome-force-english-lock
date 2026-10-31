# Force English on Lock Screen

[![GNOME Extensions](https://img.shields.io/badge/GNOME%20Extensions-Force%20English%20on%20Lock%20Screen-4a86cf?logo=gnome&logoColor=white)](https://extensions.gnome.org/extension/11572/force-english-on-lock-screen/)

> **Vibe coded:** this extension was built with AI assistance (vibe coding).

A GNOME Shell extension that switches the keyboard layout to English whenever the
screen locks and prevents switching to another layout while locked. When you unlock,
your previous layout is restored.

Works for every kind of lock: `Super+L`, idle auto-lock, lid close and suspend.

## Compatibility

| | Supported |
|---|---|
| Ubuntu | **26.04 LTS only** |
| GNOME Shell | **50** |
| Session | Wayland |

Other Ubuntu versions and other GNOME Shell versions are not supported and
may not load or work correctly.

## Requirements

- Ubuntu 26.04 LTS with GNOME Shell 50
- English must be the **first** entry in Settings → Keyboard → Input Sources

Check your setup:

```bash
lsb_release -d
gnome-shell --version
gsettings get org.gnome.desktop.input-sources sources
# should look like [('xkb', 'us'), ('xkb', 'ir')]
```

## Installation

### Option 1: From extensions.gnome.org (recommended)

Install it from the store page:
**https://extensions.gnome.org/extension/11572/force-english-on-lock-screen/**

Turn on the toggle there (requires the "GNOME Shell integration" browser extension),
or install it with the Extension Manager app by searching for
"Force English on Lock Screen".

### Option 2: Manual install from GitHub

```bash
git clone https://github.com/rwin96/gnome-force-english-lock.git \
  ~/.local/share/gnome-shell/extensions/force-english-lock@rwin
```

The folder name must match the `uuid` in `metadata.json` exactly.

### Enable it

GNOME on Wayland only detects new extensions at login, so:

1. Log out completely and log back in.
2. Enable the extension:

```bash
gnome-extensions enable force-english-lock@rwin
```

3. Verify:

```bash
gnome-extensions info force-english-lock@rwin
```

The state should be `ACTIVE` or `ENABLED`.

## Usage

1. Switch to a non-English layout.
2. Lock the screen. The lock screen shows English, and switching layouts there snaps back to English.
3. Unlock. Your previous layout returns.

## Configuration

To stay on English after unlocking instead of restoring your previous layout,
remove the `else if` block in `_onMode()` in `extension.js`.

## Troubleshooting

| Problem | Fix |
|---|---|
| `Extension does not exist` | Log out and back in, then check the folder name matches the uuid. |
| State is `ERROR` | Run `journalctl --user -b -g "force-english\|JS ERROR"` and open an issue with the output. |
| State is `OUT OF DATE` | You are not running GNOME Shell 50. This extension only supports Ubuntu 26.04 LTS. |
| Wrong layout on lock screen | English must be first in Input Sources. |
| Not affecting the login screen (GDM) | This extension only covers the lock screen. For GDM use `localectl set-x11-keymap us` and a `dconf` GDM profile. |

## Uninstall

```bash
gnome-extensions disable force-english-lock@rwin
rm -rf ~/.local/share/gnome-shell/extensions/force-english-lock@rwin
```

## Disclaimer

This project is vibe coded: it was written with an AI assistant and tested only on
Ubuntu 26.04 LTS (GNOME Shell 50). It is provided as is, without warranty. If you
find a bug, please open an issue with the output of:

```bash
journalctl --user -b -g "force-english|JS ERROR"
gnome-extensions info force-english-lock@rwin
```

## License

GPL-2.0-or-later

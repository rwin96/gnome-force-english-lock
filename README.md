# Force English on Lock Screen

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

### Option 1: From extensions.gnome.org

Once published, open the extension page and turn on the toggle (requires the
"GNOME Shell integration" browser extension or the Extension Manager app).

### Option 2: Manual install from GitHub

```bash
git clone https://github.com/YOUR_USERNAME/force-english-lock.git \
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

## License

GPL-2.0-or-later

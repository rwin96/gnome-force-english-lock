// SPDX-License-Identifier: GPL-2.0-or-later
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as Keyboard from 'resource:///org/gnome/shell/ui/status/keyboard.js';
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';

export default class ForceEnglishLock extends Extension {
    enable() {
        this._mgr = Keyboard.getInputSourceManager();
        this._saved = null;
        this._wasLocked = false;

        this._modeId = Main.sessionMode.connect('updated', () => this._onMode());
        this._srcId = this._mgr.connect('current-source-changed', () => this._enforce());
        this._onMode();
    }

    _isLocked() {
        return Main.sessionMode.currentMode === 'unlock-dialog';
    }

    _onMode() {
        const locked = this._isLocked();
        if (locked && !this._wasLocked) {
            this._saved = this._mgr.currentSource;   // remember your layout
            this._enforce();
        } else if (!locked && this._wasLocked && this._saved) {
            this._saved.activate(true);              // restore after unlock
            this._saved = null;
        }
        this._wasLocked = locked;
    }

    _enforce() {
        if (!this._isLocked()) return;
        const english = this._mgr.inputSources[0];   // first source = English
        if (english && this._mgr.currentSource !== english)
            english.activate(true);
    }

    disable() {
        if (this._modeId) Main.sessionMode.disconnect(this._modeId);
        if (this._srcId) this._mgr.disconnect(this._srcId);
        this._modeId = this._srcId = null;
        this._mgr = null;
        this._saved = null;
    }
}

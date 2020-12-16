/* eslint-disable prefer-rest-params */
'use strict';

module.exports = {
    setup,
    set_level,
    is_trace_level,
    is_debug_level,
    is_info_level,
    is_warn_level,
    is_error_level,
    log,
    trace,
    debug,
    info,
    warn,
    error
};

let show_color = true, index = 4;
const levels = ['error', 'warn', 'info', 'debug', 'trace'];

function setup(arg) {
    let level = 'debug';
    if (arg) {
        if (typeof arg === 'string') {
            level = arg;
        } else {
            level = arg.get('log_level', 'debug');
        }
    }
    index = levels.indexOf(level);
    if (index === -1) {
        index = 3;
    }
    show_color = true;
    if (process.env.GCP_PROJECT || process.env.AWS_EXECUTION_ENV || 
        process.env.stage_env === 'production' || process.env.LOGGER_NO_COLOR === 'TRUE') { 
        show_color = false;
    }
}

function set_level(level) {
    index = levels.indexOf(level);
}

function log() {
    let prefix = '#####';
    if (show_color) {
        prefix = '\x1b[5m' + prefix + '\x1b[0m';
    }
    console.log(prefix, ...arguments);
}

function is_trace_level() {
    return index >= 4;
}

function is_debug_level() {
    return index >= 3;
}

function is_info_level() {
    return index >= 2;
}

function is_warn_level() {
    return index >= 1;
}

function is_error_level() {
    return index >= 0;
}

function trace() {
    if (is_trace_level()) {
        let prefix = 'TRACE';
        if (show_color) {
            prefix = '\x1b[2m' + prefix + '\x1b[0m';
        }
        console.debug(prefix, ...arguments);
    }
}

function debug() {
    if (is_debug_level()) {
        let prefix = 'DEBUG';
        if (show_color) {
            prefix = '\x1b[6m' + prefix + '\x1b[0m';
        }
        console.debug(prefix, ...arguments);
    }
}

function info() {
    if (is_info_level()) {
        let prefix = 'INFO';
        if (show_color) {
            prefix = '\x1b[32m' + prefix + '\x1b[0m';
        }
        console.info(prefix, ...arguments);
    }
}

function warn() {
    if (is_warn_level()) {
        let prefix = 'WARN';
        if (show_color) {
            prefix = '\x1b[33m' + prefix + '\x1b[0m';
        }
        console.warn(prefix, ...arguments);
    }
}

function error() {
    if (is_error_level()) {
        let prefix = 'ERROR';
        if (show_color) {
            prefix = '\x1b[31m' + prefix + '\x1b[0m';
        }
        console.error(prefix, ...arguments);
    }
}

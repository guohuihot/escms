<template>
    <div class="ueditor">
        <vue-ueditor
            :ueditor-path="ueditorConfig.url"
            :ueditor-config="ueditorConfig"
            @before-init="handleBefore"
            @ready="ready"
        />
    </div>
</template>

<script>
import VueUeditor from '@/components/vue-ueditor'
import { editor as editorConfig } from '@/nuxt.config.js'

export default {
    name: 'YsEditor',
    components: {
        VueUeditor,
    },
    mixins: [],
    props: {
        value: {}
    },
    data() {
        let _self = this
        return {
            ueditorConfig: {
                UEDITOR_HOME_URL: editorConfig.url,
                serverUrl: `https://www.japanfangchan.com/laravel-u-editor-server/server`,
                zIndex : 5000,
                toolbars: [
                    [
                    /*'fullscreen',*/
                        'source',
                        '|',
                        'undo',
                        'redo',
                        '|',
                        'bold',
                        'italic',
                        'underline'/*, 'fontborder', 'strikethrough', 'superscript', 'subscript'*/,
                        'removeformat',
                        'formatmatch',
                        'autotypeset', /*'blockquote',*/
                        'pasteplain',
                        '|',
                        'forecolor',
                        'backcolor', /*'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc',*/
                        '|',
                        /*'rowspacingtop', 'rowspacingbottom',*/ 'lineheight', /*'letterspace',*/
                        '|',
                        'customstyle',
                        'paragraph',
                        'fontfamily',
                        'fontsize',
                        'indent',
                        '|',
                        // 'directionalityltr', 'directionalityrtl', 'indent', '|',
                        'justifyleft',
                        'justifycenter',
                        'justifyright',
                        'justifyjustify',
                        '|', /* 'touppercase', 'tolowercase', '|',*/
                        'link',
                        'unlink',
                        'anchor',
                        '|', /* 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',*/
                        /*'simpleupload', */'insertimage',
                        'emotion'/*, 'scrawl', 'insertvideo', 'music', 'attachment', 'map', 'insertframe'*/,
                        'pagebreak',
                        'template'/*, 'background'*/,
                        '|',
                        // 'horizontal', 'date', 'time', 'spechars', 'wordimage', '|',
                        // 'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
                        /*'print'*/ 'preview',
                        'drafts'
                    ]
                ],
                // 禁止word中粘贴进来的列表自动变成列表标签
                autoTransWordToList: true,
                //启用自动保存
                enableAutoSave: true,
                topOffset: 0,
                scrollContainsClass: 'el-dialog',
                initialFrameHeight: 350,
                updateFloating() {
                    _self.$emit('updateFloating')
                },
                unsetFloating() {
                    _self.$emit('unsetFloating')
                },
            }
        }
    },
    computed: {
    },
    watch: {
        /*value(val) {
            this.editor.setContent(val)
            this.editor.focus(true)
        }*/
    },
    methods: {
        handleBefore() {
            let UE = window.UE
            let editorui = UE.ui
            let utils = UE.utils
            let domUtils = UE.dom.domUtils

            editorui.letterspace = function (editor, list) {
                list = editor.options.letterspace || []
                if (utils.isEmptyObject(list)) return
                let items = []
                for (let i in list) {
                    items.push({
                        value:i,
                        label:list[i] || editor.getLang('letterspace')[i],
                        theme:editor.options.theme,
                        renderLabelHtml:function () {
                            return `<div class="edui-label %%-label"><span class="edui-for-${this.value}">${this.label || ''}</span></div>`
                        }
                    })
                }
                let ui = new editorui.Combox({
                    editor:editor,
                    items:items,
                    title: '字间距',
                    initValue: '字间距',
                    className:'edui-for-letterspace',
                    onselect:function (t, index) {
                        editor.execCommand('LetterSpace', this.items[index].value)
                    },
                    onbuttonclick:function () {
                        this.showPopup()
                    }
                })
                editorui.buttons.letterspace = ui
                /*editor.addListener('selectionchange', function (type, causeByUi, uiReady) {
                    if (!uiReady) {
                        var state = editor.queryCommandState('LetterSpace');
                        if (state == -1) {
                            ui.setDisabled(true);
                        } else {
                            ui.setDisabled(false);
                            var value = editor.queryCommandValue('LetterSpace');
                            var index = ui.indexByValue(value);
                            if (index != -1) {
                                ui.setValue(value);
                            } else {
                                ui.setValue(ui.initValue);
                            }
                        }
                    }

                });*/
                return ui
            }

            UE.plugins.letterspace = function() {
                let me = this
                me.setOpt({ 'letterspace': [
                    '1',
                    '1.5',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9',
                    '10'
                ] })
                me.commands.letterspace =  {
                    execCommand : function(cmdName, value) {
                        let startNode = this.selection.getStart()
                        let selectText = this.selection.getText()
                        console.log(this)
                        return true
                    },
                    queryCommandValue : function() {
                        let pN = domUtils.filterNodeList(this.selection.getStartElementPath(), function(node) { return domUtils.isBlockElm(node) })
                        if (pN) {
                            let value = domUtils.getComputedStyle(pN, 'letter-space')
                            return value == 'normal' ? 1 : value.replace(/[^\d.]*/ig, '')
                        }
                    }
                }
            }
        },
        ready(editor) {
            /*this.editor = editor
            this.editor.removeListener('contentChange', this.contentChange)
            this.editor.addListener('contentChange', this.contentChange)*/
            //此处为支持laravel5 csrf ,根据实际情况修改,目的就是设置 _token 值.
            editor.execCommand('serverparam', '_token', 'wVFUsWOaiox3KiOlwmYYVij8uAmJCIkMMCow8HbP')
            this.$emit('ready', editor)
        },
        contentChange() {
            let content = this.editor.getContent()
            this.$emit('input', content)
        }
    },
}
</script>

<style >
.ueditor {
    line-height: 20px;
}
</style>

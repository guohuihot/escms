<template>
    <div>
        <el-tag
            v-for="tag in tags"
            :key="tag"
            size="medium"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
        >
            {{ tag }}
        </el-tag>
        <el-input
            v-if="inputVisible"
            ref="saveTagInput"
            v-model="inputValue"
            class="input-new-tag"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
        />
        <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
        >
            添加
        </el-button>
    </div>
</template>

<script>
export default {
    name: 'EsFormTags',
    props: {
        value: {
            type: Array,
            default () {
                return []
            }
        }
    },
    data() {
        return {
            tags: [],
            inputVisible: false,
            inputValue: ''
        }
    },
    watch: {
        value: {
            handler(val) {
                this.tags = val || []
            },
            immediate: true
        }
    },
    created() {

    },
    methods: {
        handleClose(tag) {
            this.tags.splice(this.tags.indexOf(tag), 1)
        },

        showInput() {
            this.inputVisible = true
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus()
            })
        },

        handleInputConfirm() {
            let inputValue = this.inputValue
            if (inputValue) {
                this.tags.push(inputValue)
                this.$emit('input', this.tags)
            }
            this.inputVisible = false
            this.inputValue = ''
        }
    }
}
</script>

<style scoped>
  .el-tag {
    margin-right: 10px;
  }
  .button-new-tag {
    margin-right: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-right: 10px;
    vertical-align: bottom;
  }
</style>

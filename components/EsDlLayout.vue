<template>
    <div
        class="dl"
        :style="`max-width: ${maxWidth}px`"
    >
        <div
            class="dt"
            :style="{flex: '0 0 ' + cLabelWidth + 'px', color : labelColor || colorValue}"
        >
            <slot name="label">
                {{ label }}
            </slot>
        </div>
        <div
            class="dd"
            :style="`margin-left: ${space}px; ${ddStyle}`"
        >
            <slot />
        </div>
    </div>
</template>

<script>

// import a from '@/components/a'

export default {
    name: 'EsDlLayout',
    props: {
        label: String,
        ddStyle: {
            type: String,
            default: ''
        },
        labelWidth: {
            type: Number,
            default: 62
        },
        space: {
            type: Number,
            default: 0
        },
        maxWidth: Number,
        labelColor: String,
        colorValue: String
    },
    computed: {
        cLabelWidth() {
            return (this.label || this.$slots.label) ? this.labelWidth : 0
        }
    }
}
</script>

<style scoped>
.dl {
    display: flex;
    align-items: center;
}
.dt {
    text-align: right;
    /*margin-top: 5px;*/
}
.text-danger {
    > .dt {
        color: #f56c6c !important;
    }
}
.dl-l {
    > .dt {
        text-align: left;
    }
}
.dd {
    flex: 1;
    /*margin-left: 65px;*/
}
</style>

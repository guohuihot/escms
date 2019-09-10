<template>
    <img
        :id="id"
        :src="img_src"
        :alt="alt"
        :border="border"
        :width="width"
        :height="height"
        :onerror="onerror"
        :onload="onload"
    >
</template>

<script>
import img from '@/components/mixins/img'
export default {
    name: 'EsImg',
    mixins: [img],
    props: [
        'src',
        'alt',
        'border',
        'width',
        'height',
        'onerror',
        'onload',
        'id',
        'thumb'
    ],
    data () {
        return {
            defaultImg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAQAAACTbf5ZAAADyklEQVR42u3cb2iVVRgA8N/V2XRWZppDp5SWRh8yyFyk5hAJhVBMKctFktHsL8ISIikSirKCWiGhUpn2IWuTyGFQ5MiSSFAhjMg/kaaWCaVUm+XcvX1wyO7dO72b90rU83zb85z3PfzOed/znjPYUpmM/1X0IsABDnCAAxzgAAc4wAEOcIADHOAABzjAAQ5wgAMc4AAHOMABDnCAAxzgAAc4wAEOcIADHOAABzjAAQ5wgAMc4AAH+F8XJd1rvliT/jYY2CG3TY2U7Vntdllvq1/0UWGSOwzJ686nIuUyg411u5FZ1SqvZF1xRL0tDmk1TJU78+ijhzPcbOUZ62l17tLggFbNdnvLbTbkdecyo402QotvrTPHMuku2643y5t2+dMJP3jbbJ8WY4ZPRb25HUY/N5ZpwEzzjNLma6vssFTarLPed/zpOTxorQbvG2N2Ysu16nCT+a7T5hsf+Nh7pkoVY4YnyqjrsvqZBjxmqTFKlKq0yjS84EA3+hjuCZNRn1jd6VVUW65SqTKVnrPUi3lwewSeosIXtibWMlbiavOyunhcX397p1u9pEzC7sSH+nUZFRZ1AKbMzFpXCgputRAva0uo7bELC3LG+hKzsdHJbvVzKTJOdMoftBX39+xt7Am4xXSX26MxobYDTE54Kjjuu271sw8X6dspvw1MPX/f4RYlFmG55k61/RiktFN+6OlqvvGH9ZiQUNmLgfqfP/BxVBnnN2s61X7HsIRrhkjhWF73/8sBH7nXzy5Qk1A/1kUfRdl4nFqYSKlVba05yrPe1xSJy0w6r9Hd7PoOP42yJPHjd25/DlvS0wuvMUOj5Z5R1iF7MX5KaH1EBgPOuvGoQC/lhrrBlC4GaEAXfRQZzEM+sVG1flmzwlHHs3JwCFyZ98bjTHEFjmrJGujzcngoNx8rspaPcWBTp7abcKGrCrL9Hw95biQLfFq6xyCf+7FDZqRrsSbnPfvVh5ihd0HAI43F6sR9QJHBZR4lZ61eiO+zcm2e16rM3QU74j2I/TlHmI1eyms5O8fz8K3G2JKVmaAar3naXmmttqvRhCXt3+JCxI0W4A2L7XRS2j7Pesq77dueoi1a0FutB3JytUqt1qhR7/bHrsyTphf0GP+wflZo0iSllzb0Udu+ghQVTKUqm3O2/Y+YpsFXDis13M3mGlzg31uk3OcW9b50WNpwE801Ir8r499aBDjAAQ5wgAMc4AAHOMABDnCAAxzgAAc4wAEOcIADHOAABzjAAQ5wgAMc4AAHOMABDnCAAxzgAAc4wAEO8H8j/gH4o8ndGjYekgAAAABJRU5ErkJggg=='
        }
    },
    computed : {
        img_src :  function()  {
            let ret = this.src
            // typeof this.src == 'object' 兼容报错
            if (ret == '' || ret == null || typeof this.src == 'object') {
                ret =  this.defaultImg
            }
            return this.getImgUrl(ret, this.thumb || 0)
        }
    },
}
</script>

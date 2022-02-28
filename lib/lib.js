module.exports = () => {

    const $ = require( 'jquery' ),
        axios = require( 'axios' )

    /**
     * @param {'dai'|'usdt'|'usdc'|'wbtc'|'weth'|'tonic'|'cro'} coin
     * @param {'dai'|'tether'|'usd-coin'|'wrapped-bitcoin'|'weth'|'tectonic'|'crypto-com-chain'} coingekoId
     */
    const coinObserver = ( coin, coingekoId ) => new MutationObserver( ( _, obs ) => {

        const element = document.querySelector( `a[href="/markets/${ coin }/"]` )

        element && axios.get(

            `https://api.coingecko.com/api/v3/simple/price?ids=${ coingekoId }&vs_currencies=usd`

        ).then( res => {

            const price = `${ coin.toUpperCase() }\n$${ res.data[ coingekoId ][ 'usd' ].toFixed( 8 ) }`

            element.firstChild.firstChild.firstChild.lastChild.firstChild.innerText = price

            obs.disconnect()

        } )

    } )

    $( () => {

        console.log( 'ready!' )

        coinObserver( 'dai', 'dai' ).observe( document, { childList: true, subtree: true } )
        coinObserver( 'usdt', 'tether' ).observe( document, { childList: true, subtree: true } )
        coinObserver( 'usdc', 'usd-coin' ).observe( document, { childList: true, subtree: true } )
        coinObserver( 'wbtc', 'wrapped-bitcoin' ).observe( document, { childList: true, subtree: true } )
        coinObserver( 'weth', 'weth' ).observe( document, { childList: true, subtree: true } )
        coinObserver( 'tonic', 'tectonic' ).observe( document, { childList: true, subtree: true } )
        coinObserver( 'cro', 'crypto-com-chain' ).observe( document, { childList: true, subtree: true } )

    } )

}
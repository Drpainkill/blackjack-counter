# Blackjack Counter

Hi-Lo card counter for 8-deck live blackjack. Everything on the page is solved
from the exact cards left in the shoe rather than from lookup tables:

- Hi-Lo running and true count, with a bet ramp
- A strategy chart recomputed after every card, with count deviations framed in gold
- Per-hand win / push / lose rates against every dealer upcard
- Dealer bust odds and live insurance EV
- A cash-out checker that prices a buyout offer against the hand's real value

Single self-contained file — no build, no server, no dependencies. Open
`index.html` and it runs.

**Live:** https://drpainkill.github.io/blackjack-counter/

## Table rules modelled

8 decks · dealer stands on all 17s · double on any two cards, one card only ·
one split per hand · no hit on split aces · blackjack pays 3:2 · insurance 2:1.
Evolution has no double-after-split; Pragmatic does. Dealer checks for blackjack
under an Ace but **not** under a ten, so a hidden blackjack takes doubled and
split bets too — both settings are switchable on the dashboard.

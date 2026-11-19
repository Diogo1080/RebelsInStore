---
type: mechanic
frequency: weekly
tags:
  - economy
  - mechanic
  - house-rule
---

# Colony Production

> [!info] House rule based on [Bastions](https://dnd2024.wikidot.com/bastions)
> The colony works like a Bastion that the whole group shares, and that is available from level 1. Logged in [[00 - Campaign Rules]].
>
> | Bastion rule | Colony version |
> | --- | --- |
> | Bastion turn every 7 days | Colony turn every week |
> | Special facility + hirelings | Settler group |
> | Harvest order | Food (Coastal, Agricultural) |
> | Craft order | Production (Industrial), Alchemy, Faith |
> | Trade order | Ordering from the [[Royal Supply Contracts\|Crown ship]] |
> | Recruit / Defenders | Soldiers and guards |
> | Maintain (applies to the whole Bastion) | Maintain is chosen **per building** |
> | Bastion Events (d100) | A weekly event roll for the colony |

## Calendar
- **1 season = 4 weeks**, so one year (spring, summer, autumn, winter) is **16 weeks**.
- The expedition **lands at the start of spring**.
- A colony turn happens every week. The [[Royal Supply Contracts|Crown's supply ship]] arrives once per season.

Each week, every main settler group produces **2 points** of its assigned resource. Specialist teams produce **1 point** because their work takes longer.

## Resources

| Resource | Produced by | Used for |
| --- | --- | --- |
| **Food** | [[The Coastal Settlers]], [[The Agricultural Settlers]] | Feeding the colony |
| **Production** | [[The Industrial Settlers]] | Buildings or weapons |
| **Alchemy** | [[The Alchemists]] | Potions (no healing) and oils for the party |
| **Faith** | [[The Religious Order]] | Healing potions and blessed pendants |

Unspent Alchemy and Faith carry over, so players can save up for expensive items.

## Weekly Base Output

| Group | Resource | Per week |
| --- | --- | --- |
| [[The Coastal Settlers]] | Food | 2 |
| [[The Agricultural Settlers]] | Food | 1 → 3 *(see below)* |
| [[The Industrial Settlers]] | Production | 2 |
| [[The Alchemists]] | Alchemy | 1 |
| [[The Religious Order]] | Faith | 1 |

### Agricultural Ramp-up
Fields take time to become productive, so the farmers' output grows each season until it reaches 3.

| Season | Year 1 | Following years |
| --- | --- | --- |
| Spring | 1 | 2 |
| Summer | 2 | 3 |
| Autumn | 3 | 3 |
| Winter | 1 | 1 |

## Food Upkeep
**1 Food feeds 20 people for one week.** Round the total up.

| Who is eating | People | Food per week |
| --- | --- | --- |
| Whole expedition (ship crew included) | 65 | **4** |
| Ship goes home with a skeleton crew of 8 | 57 | **3** |

This ties into [[The Royal Fortune]] decision: a ship that stays costs 1 extra Food every week.

### Starting Stores
The ship's provisions ([[Expedition Supplies]], about 60 days) are worth **32 Food**. That is 8 weeks of upkeep for the whole expedition, in which time the colony has to start feeding itself. If the ship goes home, its skeleton crew takes 4 Food for the voyage, leaving **28 Food**.

### Foraging
Each week, soldiers or idle hands can forage. A player makes a Wisdom (Survival) check.

The DC depends on the season:

| Season | Foraging DC |
| --- | --- |
| Spring | 14 |
| Summer | 12 |
| Autumn | 10 |
| Winter | 18 |

| Result | Food |
| --- | --- |
| Success | +1 |
| Failure | 0 |

#### Idle Buildings
A building given no order that week forages instead.
- Roll a **plain d20** with no modifiers against the season's DC.
- **Exception:** buildings of [[The Religious Order]] roll with **advantage**.

### Shortage
If the colony cannot pay its upkeep from production plus stores:

| Weeks short in a row | Effect |
| --- | --- |
| 1 | **Hungry:** each group produces 1 less next week |
| 2 | **Unrest:** a group leader demands action; roll a colony event with disadvantage |
| 3+ | **Starving:** settlers fall ill, desert or die (lose 1d4 people each week); PCs follow the [Exhaustion](https://dnd2024.wikidot.com/) rules for going without food |

Buying food from the Crown ends the shortage, but it counts as a request and raises the [[Royal Supply Contracts|Royal Tax]].

### Balance Check (65 people, upkeep 4)

| Starting choice (year 1) | Spring | Summer | Autumn | Winter | Verdict |
| --- | --- | --- | --- | --- | --- |
| Coastal + Agricultural | -1 | 0 | +1 | -1 | Comfortable; builds a surplus |
| Coastal + Industrial | -2 | -2 | -2 | -2 | Stores last 16 weeks; must forage, buy food or fish more |
| Agricultural + Industrial | -3 | -2 | -1 | -3 | Hard; foraging and the Crown are vital early |
| Coastal + Specialist | -2 | -2 | -2 | -2 | Like Coastal + Industrial |
| Agricultural + Specialist | -3 | -2 | -1 | -3 | Hardest start; the trade-off for having the specialist |

Foraging (+1) moves each row up by one.

## Spending Production
At the end of each week, players choose how to spend Production:
- **Buildings**: put points towards a structure until it is complete.
- **Weapons**: arm settlers or soldiers.

Costs for buildings and weapons are still to be set. Item costs for Alchemy and Faith are in each team's note.

## Weekly Turn
1. **Orders, building by building:** each building or work site gets its **own order** every turn. Examples: a settler group's work site, an export building, the facility from [[The Royal Fortune#Option C Dismantling the Ship|the dismantled ship]]. Giving one building Maintain does not stop the others from acting. A building with no order **forages automatically**; see [[Colony Production#Idle Buildings|Foraging]].
2. **Upkeep:** the colony eats 1 Food per 20 people; see Food Upkeep above.
3. **Spend:** players spend Production, Alchemy and Faith.
4. **Trade:** players may order from the Crown; see [[Royal Supply Contracts]].
5. **Event:** roll on a colony version of the Bastion Events table *(to be adapted)*.

> [!todo] Open questions
> - Test the Food upkeep numbers in play
> - Production costs for buildings and weapons

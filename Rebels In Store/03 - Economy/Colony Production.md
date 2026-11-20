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
> | Bastion Events (d100) | A weekly event roll for the colony; see [[Colony Production#Colony Events\|Colony Events]] |

## Calendar
- **1 season = 4 weeks**, so one year (spring, summer, autumn, winter) is **16 weeks**.
- The expedition **lands at the start of spring**.
- A colony turn happens every week. The [[Royal Supply Contracts|Crown's supply ship]] arrives once per season.

Each week, everyone's efforts give the colony a base of **1 Food** and **1 Production**. Settler groups add a bonus on top: **+1** to their resource (the Agricultural Settlers' bonus changes by season). Specialist teams produce **1 point** of their own resource because their work takes longer.

## Resources

| Resource | Produced by | Used for |
| --- | --- | --- |
| **Food** | The whole colony (1), plus [[The Coastal Settlers]] (+1) and [[The Agricultural Settlers]] (+0 to +3) | Feeding the colony |
| **Production** | The whole colony (1), plus [[The Industrial Settlers]] (+1) | Buildings or weapons |
| **Alchemy** | [[The Alchemists]] | Potions (no healing) and oils for the party |
| **Faith** | [[The Religious Order]] | Healing potions and blessed pendants |

Unspent Alchemy and Faith carry over, so players can save up for expensive items.

## Weekly Base Output

| Group | Resource | Per week |
| --- | --- | --- |
| Whole colony (everyone's efforts) | Food | 1 |
| [[The Coastal Settlers]] | Food | +1 |
| [[The Agricultural Settlers]] | Food | +0 to +3 *(see below)* |
| Whole colony (everyone's efforts) | Production | 1 |
| [[The Industrial Settlers]] | Production | +1 |
| [[The Alchemists]] | Alchemy | 1 |
| [[The Religious Order]] | Faith | 1 |

### Agricultural Ramp-up
Fields take time to become productive. The farmers' bonus builds through the first year and settles into a seasonal cycle from year 2: it peaks at harvest in autumn and adds nothing in winter.

| Season | Year 1 bonus | Following years bonus |
| --- | --- | --- |
| Spring | +0 | +1 |
| Summer | +1 | +2 |
| Autumn | +2 | +3 |
| Winter | +0 | +0 |

## Food Upkeep
**1 Food feeds 20 people for one week.** Round the total up.

| Who is eating                                               | People  | Food per week |
| ----------------------------------------------------------- | ------- | ------------- |
| Start: two settler groups (ship crew included)              | 64      | **4**         |
| Start: settler group + specialist team                      | 54      | **3**         |
| Either start, ship goes home with a skeleton crew of 8      | 56 / 46 | **3**         |
| Third group arrives: all three settler groups               | 84      | **5**         |
| Third group arrives: two settler groups + a specialist team | 74      | **4**         |

This ties into [[The Royal Fortune]] decision: with two settler groups, a ship that stays costs 1 extra Food every week. The free third group arrives at the end of summer (see [[Royal Supply Contracts#Choosing the Next Group]]).

### Starting Stores
The ship's provisions ([[Expedition Supplies]], two seasons) are worth **32 Food**. That is two seasons (8 weeks) of upkeep for the whole expedition, in which time the colony has to start feeding itself. If the ship goes home, its skeleton crew takes 4 Food for the voyage, leaving **28 Food**.

### Foraging and Gathering
Each week, soldiers or idle hands can do **one** of these:
- **Forage** for food: a player makes a Wisdom (Survival) check.
- **Gather materials** (driftwood, deadfall timber, stone, clay): a player makes a Strength (Athletics) check.

The DC depends on the season:

| Season | Foraging DC | Gathering DC |
| --- | --- | --- |
| Spring | 14 | 12 |
| Summer | 12 | 10 |
| Autumn | 10 | 12 |
| Winter | 18 | 16 |

| Result | Forage | Gather |
| --- | --- | --- |
| Success | +1 Food | +1 Production |
| Failure | 0 | 0 |

Gathering adds to the colony's base 1 Production a week. A colony without [[The Industrial Settlers]] can use it to build a little faster, at the cost of the Food it could have foraged.

#### Idle Buildings
A building given no order that week forages or gathers instead (players choose which).
- Roll a **plain d20** with no modifiers against the season's DC.
- **Exception:** buildings of [[The Religious Order]] roll with **advantage** when foraging.

### Shortage
If the colony cannot pay its upkeep from production plus stores:

| Weeks short in a row | Effect |
| --- | --- |
| 1 | **Hungry:** each group produces 1 less next week |
| 2 | **Unrest:** a group leader demands action; roll a colony event with disadvantage |
| 3+ | **Starving:** settlers fall ill, desert or die (lose 1d4 people each week); PCs follow the [Exhaustion](https://dnd2024.wikidot.com/) rules for going without food |

Food from the Crown ends the shortage. Trading surplus goods for it on the supply ship is fair trade (see [[Royal Supply Contracts#Trading the Surplus (proposed)|Trading the Surplus]]). Asking for it without paying counts as a request and raises the [[Royal Supply Contracts|Royal Tax]].

## Spending Production
At the end of each week, players choose how to spend Production:
- **Buildings**: put points towards a structure until it is complete.
- **Weapons**: arm settlers or soldiers.

Item costs for Alchemy and Faith are in each team's note.

> [!info] How costs are pitched
> Everyone's efforts give the colony **1 Production a week** (4 a season, 16 a year). [[The Industrial Settlers|Industrial Settlers]] add **+1**, for 2 a week: 8 a season, about 32 in year 1. Early must-haves cost 3–4, a single project about a season (6–8), and big upgrades most of a year (12–20).

### Buildings *(proposed)*

| Building | Cost | Effect |
| --- | --- | --- |
| **Shelters** (per 20 people) | 2 | Basic housing. A group without shelter in winter rolls Sickness twice as often. A **Disaster** may destroy one. Not needed if [[The Royal Fortune#Option C Dismantling the Ship\|the ship is dismantled]] |
| **Storehouse** | 4 | **Raid on the stores** and **Disaster** lose half as much (round down) |
| **Well or water channel** | 4 | Secure water at the camp; ends the weekly water hauling (see [[01 - The Water Survey]]). Costs 2 less if the party befriended the bear in The Water Survey |
| **Infirmary** | 5 | **Sickness** can be stopped with a DC 12 Wisdom (Medicine) check instead of 1 Faith |
| **Houses** (per 20 people) | 6 | Permanent, resilient housing; replaces a Shelter. Not destroyed by a **Disaster**, and the group living in them is immune to **Sickness** in winter. A sign the colony is here to stay |
| **Palisade** | 6 | Advantage on checks against raids, wild animals and attacks on the camp |
| **Export building** | 6 | 1 export good a week, and **+1 to its group's resource** every week. See [[Crown Exports]] |
| **Dock and boats** | 6 | [[The Coastal Settlers]] make **+1 Food in summer**; a safe landing for the supply ship |
| **Workshop / Forge** | 8 | Unlocks martial weapons and armour |
| **Temple upgrade** | 12 | Unlocks Superior Healing and Tier III pendants ([[The Religious Order]]) |
| **Laboratory upgrade** | 12 | Unlocks rare recipes once their ingredients are found ([[The Alchemists]]) |
| **Harbour** | 20 | Needs a Dock. Ships unload directly. [[Industrial Leader - Hilde\|Vossberg]]'s dream; brings Crown harbour taxes, which [[Coastal Leader - Marta\|Marta]] hates |

### Weapons and Gear *(proposed)*

| Item | Cost | Notes |
| --- | --- | --- |
| **Militia arms** (10 settlers, simple weapons) | 2 | Settlers can help defend the camp |
| **Simple weapon** for a PC | 1 per 2 weapons | Any 2024 simple weapon |
| **Martial weapon** | 1 | Needs the Workshop / Forge |
| **Light or medium armour** | 2 | Needs the Workshop / Forge |
| **Heavy armour** | 4 | Needs the Workshop / Forge and iron |
| **Ship repairs** (if it stays) | 2 per season | Upkeep for [[The Royal Fortune]]. Not needed in the first season (spring of year 1), while the ship is fresh from its refit |

> [!todo] Production costs: decisions
> - [x] Shelters as a real cost, or too much bookkeeping? Kept, at 2 Production
> - [x] Keep or drop ship repair upkeep? Kept, at 2 Production per season
> - [ ] More buildings to be added later (chapel, smokehouse, lookout tower…)

## Weekly Turn
1. **Orders, building by building:** each building or work site gets its **own order** every turn. Examples: a settler group's work site, an export building, the facility from [[The Royal Fortune#Option C Dismantling the Ship|the dismantled ship]]. Giving one building Maintain does not stop the others from acting. A building with no order **forages or gathers automatically**; see [[Colony Production#Idle Buildings|Idle Buildings]].
2. **Upkeep:** the colony eats 1 Food per 20 people; see Food Upkeep above.
3. **Spend:** players spend Production, Alchemy and Faith.
4. **Trade:** on a supply ship week, pay the tax, then trade any surplus for Food or Production; see [[Royal Supply Contracts#Trading the Surplus (proposed)|Trading the Surplus]].
5. **Event:** roll d100 on the [[Colony Production#Colony Events|Colony Events]] table, using the current season's column.

## Colony Events
Adapted from the [Bastion Events](https://dnd2024.wikidot.com/bastions) table. Roll **d100 once per week** and read the column for the current season. Events run from worst (top) to best (bottom). Summer is the safest season to roll in, and winter the most dangerous.

If the colony is in **Unrest** (see [[Colony Production#Shortage|Shortage]]), roll twice and use the lower result.

| Event | Spring | Summer | Autumn | Winter |
| --- | --- | --- | --- | --- |
| **Disaster** | 01–03 | 01 | 01–03 | 01–05 |
| **Sickness** | 04–10 | 02–05 | 04–09 | 06–15 |
| **Raid on the stores** | 11–16 | 06–09 | 10–15 | 16–24 |
| **Accident** | 17–22 | 10–14 | 16–21 | 25–32 |
| **Quarrel** | 23–30 | 15–20 | 22–29 | 33–42 |
| **Quiet week** | 31–70 | 21–55 | 30–67 | 43–83 |
| **Signs from the trees** | 71–75 | 56–62 | 68–72 | 84–86 |
| **Good haul** | 76–83 | 63–74 | 73–82 | 87–91 |
| **Useful salvage** | 84–90 | 75–84 | 83–90 | 92–95 |
| **High spirits** | 91–95 | 85–92 | 91–95 | 96–98 |
| **Discovery** | 96–99 | 93–98 | 96–99 | 99 |
| **Windfall** | 100 | 99–100 | 100 | 100 |

| Chance of… | Spring | Summer | Autumn | Winter |
| --- | --- | --- | --- | --- |
| A bad event | 30% | 20% | 29% | 42% |
| A quiet week | 40% | 35% | 38% | 41% |
| Signs from the trees (good or bad) | 5% | 7% | 5% | 3% |
| A good event | 25% | 38% | 28% | 14% |

### Bad Events
- **Disaster:** a fire, storm or flood hits the camp. Lose **1d4 Food** and **1d4 Production** from stores, and roll a d6: on a **4 or higher, one Shelter is destroyed** (Houses always survive). In winter, also roll on Sickness.
- **Sickness:** illness spreads through one group (roll randomly). It produces **1 less** next week. [[The Religious Order]] can spend **1 Faith** to prevent it.
- **Raid on the stores:** animals (or something worse) break into the stores. Lose **1d2 Food**. Players can track the culprit; a good hook for a short adventure.
- **Accident:** a tool breaks or a settler is badly hurt at work. Lose **1 Production**, or one group produces 1 less next week (players choose).
- **Quarrel:** two group leaders clash over land, stone or priorities (roll for them, or pick a known rivalry). A player settles it with a **DC 13 Charisma (Persuasion)** check. On a failure, the losing side's group produces 1 less next week.

### Either Way
**Signs from the trees:** the people who watch from the forest leave something at the edge of camp. What it is depends on how the colony has treated them:

| Their attitude                              | What they leave                                                  | Effect                                                |
| ------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------- |
| **Friendly**                                | Food, herbs or feathers                                          | **+1 Food** or **+1 Alchemy** or **+1 Faith**         |
| **Wary** (default, or before first contact) | A carved token or a bundle of bones on the path                  | No gain; a hook for meeting them                      |
| **Hostile**                                 | Cut nets, a spoiled water barrel or a warning carved into a tree | **Lose 1 Food**, or a group produces 1 less next week |

Their attitude changes through play, for example by respecting or desecrating the Stone Spring in [[01 - The Water Survey]], or befriending the bear.

### Good Events
- **Good haul:** a big catch, a rich patch of berries or a herd of game. **+1 Food**.
- **Useful salvage:** driftwood, a wreck on the beach or good stone in easy reach. **+1 Production**.
- **High spirits:** morale is high. One group of the players' choice produces **+1** next week.
- **Discovery:** settlers find something valuable: a mineral deposit, a rare plant or a safe harbour. Unlocks a rare Alchemy recipe or a story hook (DM's choice). [[Navigator - Corwin|Ashby]] hears about it.
- **Windfall:** a passing merchant, a wrecked ship's cargo or an unexpectedly rich harvest. **+2 Food** and **+2 Production**.

## Examples
Worked examples for every starting choice: food first, then building. Both assume the ship stays and the free third group arrives at the end of summer (see [[Royal Supply Contracts#Choosing the Next Group]]).

### Food: Balance Check
Weekly Food balance (production minus upkeep), with the ship staying. No buildings or foraging counted.

#### Year 1, Spring and Summer (the starting pair)

| Start | Upkeep | Spring | Summer |
| --- | --- | --- | --- |
| Coastal + Agricultural | 4 | -2 | -1 |
| Coastal + Industrial | 4 | -2 | -2 |
| Agricultural + Industrial | 4 | -3 | -2 |
| Coastal + Specialist | 3 | -1 | -1 |
| Agricultural + Specialist | 3 | -2 | -1 |
| Industrial + Specialist | 3 | -2 | -2 |

#### After the Third Group Arrives (year 1 autumn onwards)
The free third group is always a settler group, so these are the only possible final mixes. Alchemists and the Religious Order count the same here, since neither makes Food.

| Final mix | Upkeep | Y1 Autumn | Y1 Winter | Y2 Spring | Y2 Summer | Y2 Autumn | Y2 Winter | Year 2 total | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Coastal + Agricultural + Specialist | 4 | 0 | -2 | -1 | 0 | +1 | -2 | **-8** | Best; one forager a week balances it |
| Coastal + Agricultural + Industrial | 5 | -1 | -3 | -2 | -1 | 0 | -3 | **-24** | Builds well, but 20 more mouths hurt |
| Agricultural + Industrial + Specialist | 4 | -1 | -3 | -2 | -1 | 0 | -3 | **-24** | Winter bites; needs a Mill or the Crown |
| Coastal + Industrial + Specialist | 4 | -2 | -2 | -2 | -2 | -2 | -2 | **-32** | Steady shortfall; needs a Dock |

Foraging every week adds up to +16 a year, which balances only the best mix. A food group's export building (Saltworks or Mill and Granary) adds another **+16 Food a year**, which turns the -8 and -24 mixes around. Starting with two settler groups means the third is fixed, and the full 84-person colony is hungry. Starting with a specialist team keeps the colony smaller, and picking the missing food group third gives the best food mix in the game.

### Production: Example Year 1
One possible build order per starting pair, including a sensible free third group (arriving at the end of summer). Unspent Production carries over. The [[Royal Supply Contracts#The First Shipment|relief ship]]'s Production is counted in summer. Assumes the ship is not dismantled (otherwise skip Shelters). Shelters are needed for every 20 people in the groups.

#### Starting With the Industrial Settlers
2 Production a week (8 a season) + 2 from Standard relief = **34 in year 1**.

| Start | Third group | Spring | Summer | Autumn | Winter | Left over |
| --- | --- | --- | --- | --- | --- | --- |
| **Coastal + Industrial** | Agricultural | Shelters ×2, Storehouse | Saltworks, Well | Shelters, Palisade | Workshop / Forge | 0 |
| **Agricultural + Industrial** | Coastal | Shelters ×2, Storehouse | Mill and Granary, Well | Shelters, Palisade | Workshop / Forge | 0 |
| **Industrial + Alchemists** | Coastal | Shelters ×2, Storehouse | Sawmill or Dye Works, Well | Shelters, Infirmary | Workshop / Forge | 1 |
| **Industrial + Religious Order** | Coastal | Shelters ×2, Storehouse | Sawmill or Apiary, Well | Shelters, Infirmary | Workshop / Forge | 1 |

#### Starting Without the Industrial Settlers
1 Production a week (4 a season) + 4 from Standard relief = **20 in year 1**, or **28** if the Industrial Settlers are the third group.

| Start | Third group | Spring | Summer | Autumn | Winter | Left over |
| --- | --- | --- | --- | --- | --- | --- |
| **Coastal + Agricultural** | Industrial | Shelters ×2 | Saltworks or Mill | Shelters, Storehouse, Well | Workshop / Forge | 0 |
| **Coastal + Alchemists** | Agricultural | Shelters ×2 | Saltworks | Shelters, Storehouse | Well | 0 |
| **Coastal + Religious Order** | Agricultural | Shelters ×2 | Saltworks | Shelters, Storehouse | Saving for an Infirmary | 4 |
| **Agricultural + Alchemists** | Coastal | Shelters ×2 | Mill and Granary | Shelters, Storehouse | Well | 0 |
| **Agricultural + Religious Order** | Coastal | Shelters ×2 | Mill and Granary | Shelters, Storehouse | Saving for an Infirmary | 4 |

### What Each Start Feels Like
- **Coastal + Industrial:** the builder's colony. Taking the farmers third gives it the best long-term food too.
- **Agricultural + Industrial:** buildings come easily, food doesn't. Fishers third make winter survivable.
- **Industrial + a specialist team:** builds quickly, but makes only the base Food until the third group lands. A food group third is close to essential.
- **Coastal + Agricultural:** the safest food start. The Industrial Settlers always arrive third, doubling its building at the cost of +1 Food upkeep.
- **Coastal or Agricultural + a specialist team:** the smallest colony (54 people), so the cheapest to feed early. Taking the other food group third gives the best food mix in the game, but building stays slow.

The free third group is the colony's biggest decision after the starting pair: food security or building speed.

> [!todo] Open questions
> - Test the Food upkeep numbers in play
> - Production costs for buildings and weapons (proposed, see Spending Production)

const activity = (name, params, wording, sequence, evidence, misses, drill) => ({name, params, wording, sequence, evidence, misses, drill});
const levels = {
1:{roman:"I",color:"#5b8c28",title:"一级｜基础能力必须在完整考试中同时成立",summary:"一级是一次 综合且不可拆分的考核。三个模块都达到标准才获得认证，模块不能保留。Riding 不是逐项判通过；考官用多个项目判断你能否整合全部六个 Snowboard Technical Fundamentals、突出一个指定 individual Snowboard Technical Fundamental，并通过 Duration, Intensity, Rate, and Timing (DIRT) 改变结果。",terrain:["初学区域","Green与部分简单Blue","超小—小型自由式地形"],structure:["1 次综合考试","12 个指定 Riding 活动","通常每项观察 2 次，共 24 次","2 次 Personal Performance Analysis + 2 次 Movement Analysis","Teaching 最长 20 分钟"],modules:[
["Riding Performance","六类Core Activities，加beginner进阶项目与其他一级活动。评分分别观察：能否综合运用全部六项Snowboard Technical Fundamentals；能否按要求突出其中一项；能否通过Duration, Intensity, Rate, and Timing (DIRT)改变弯形、弯大小和路线。"],
["Movement Analysis / Technical Understanding","分析自己的两次表现，并观察另一位骑手两次。用一个或多个 Snowboard Technical Fundamentals，在两个phases of the turn或两个 Approach, Takeoff, Maneuver, and Landing (ATML) 阶段说明身体动作、board结果和因果，再提出具体改变。"],
["Teaching & People Skills","围绕 beginner重点项目 评估同伴、设计练习顺序、执行并复盘。考官观察安全与生理需要、全组沟通、提问、示范、练习节奏以及收到反馈后的行为。"]],activities:[
activity("Skidded Turns",["Blue","Medium","Closed","Extending Edge Change","Aligned"],
["Skidded 不是把板横过来刹车，而是snowboard向前走的同时持续、可控地横向滑动。板尾轨迹比板头更外侧，但滑动量要连续。","Medium 是约两条压雪机履带宽，约 9 米。考官看corridor能否重复，不看某一个弯画得大。","Closed 表示板头越过fall line并在completion phase更多朝向山侧，约完成 80–90°；速度主要靠弯形控制。","Extending Edge Change 表示edge change前腿接近本次动作范围内最长；不是起跳，也不是全程直腿。","Aligned 表示上身与snowboard大体同步转向；不能用肩膀抢先把板甩过去。"],
["旧弯完成：用Closed Turn形控制速度，不突然横板。","edge change：逐步伸踝、膝、髋释放old edge，让center of mass (CM)跨过snowboard。","控制阶段：重新屈腿，以腿和髋产生 pivot 与 twist，让板连续Skidded。","completion phase：板头越过fall line，左右弯回到同一corridor和速度。"],
["左右弯大小、形状和节奏接近。","track较宽但连续，没有直冲后急刹。","edge change前能看见extension，控制阶段能看见重新flexion。","center of mass (CM)没有长期落到板头或板尾之外。"],
["Z 形：initiation phase直冲、弯底猛转。","用跳起代替逐步extension。","身体过度向弯内倒，刃在completion phase突然抓住。","肩髋过度rotation，板尾一次性甩出。"],"固定约 9 米corridor。每次板头越过fall line后再edge change；edge change数‘伸’，control phase数‘屈’，让skid声从initiation phase到completion phase连续。"),
activity("Carved Turns",["Green","Large","Carved"],
["Carved 的判定是板尾沿板头走过的路径通过，雪面留下窄而连续的弧线，不是单看速度或edge angle。","Large 是约三条压雪机履带宽以上，约 13.5 米以上。","Activities List 没固定这个项目的edge change方式；考官当天若增加 edge-change、shape 或 line 参数，以当天指令为准。"],
["进弯前选能完成Large且不需急刹的速度和净空。","释放old edge后让身体越过snowboard，尽早建立new edge。","逐步增加 tilt，让sidecut带板转弯，减少不必要的 pivot。","completion phase用腿管理pressure，不让pressure全部堆到弯底。"],
["从initiation phase到completion phase都是窄弧线。","两侧弧线半径与corridor接近。","身体继续随板移动，不在completion phase停住。","速度来自完整弯形，不靠最后横推。"],
["板头先切、板尾在弯底skid。","先用肩带板 pivot，initiation phasetrack已变宽。","弯底pressure突增导致 snowboard连续振动。","过度向弯内倒，无法释放old edge。"],"先检查身后track。只统计从头到尾单线的弯；出现宽痕就减速或降低edge angle，恢复单线后再增加幅度。"),
activity("Off-Piste / Bumps",["Blue","Skidded"],
["一级只固定 Blue 与 Skidded，没有固定弯大小、edge change动作或路线。不要把某一种 mogul line 当成唯一标准。","考点是地形改变pressure和board方向时，仍能得到考官指定的路线、速度和弯形。","Skidded 允许横向滑动，但skid必须服务于转向和控速。"],
["先选能连续完成多个弯的路线。","地面抬高时腿变短，地面下降时腿伸长，保持板与雪接触。","用弯形和可控skid调速。","上身保持足够稳定，让腿在身体下工作。"],
["连续多个弯的速度和路线可预测。","snowboard在起伏中保持接触。","腿部flexion and extension对应地形，而不是整个人被抛起。","骑手仍能抬头观察后续路线。"],
["遇到每个包都停一下或被迫直冲。","腿僵硬，板离雪后落地急刹。","center of mass (CM)长期落后。","只用上身torsional flex，腿没有独立转板。"],"在低风险Blue起伏地形只做三至五弯，要求板不断雪、速度不增加、下一转点提前确定。"),
activity("Switch Turns",["Green","Medium","Open","Switch"],
["Switch 只改变前进方向，不降低对弯形、edge change和速度控制的要求。","Medium 约 9 米；Open 表示completion phase板头仍较多朝山下，约转 45–60°，没有完全横过山坡。","Open Turn保留下坡动量，必须用连续路线控速，不能靠最后一个急Closed Turn。"],
["视线转向switch行进方向，但肩膀不过度预转。","踝膝髋跨过板完成连续edge change。","腿带板完成中等Open Turn，上身跟随而不过度领先。","每弯在相同方向角结束。"],
["heel / toe 两侧都连续。","视线、躯干和骨盆不把板拧成突然 pivot。","Open角度和Mediumcorridor可重复。","中途不切回forward重置。"],
["一侧用 falling leaf 代替转弯。","先甩肩再等板跟上。","弯逐渐变小或Closed。","长期看向山上。"],"设约 9 米corridor，每弯结束时板头仍朝斜下方；连续完成相同数量 heel 和 toe 弯，不允许forward重置。"),
activity("Straight Air",["Small jump","No rotation","No grab"],
["Approach 速度要让骑手自然到达 landing zone，不是越快越好。","后脚到台唇时主动起跳：在板仍受支撑时extension；太早会落回台面，太晚会被台唇抛出。","空中 retract legs 是把双腿收向身体，不是弯腰压向snowboard。","Land even on both feet 是两脚同时承压，随后屈腿吸收。"],
["Approach：直线、board稳定，提前调速。","Takeoff：后脚到台唇时主动伸腿，板沿fall line离台。","Maneuver：收双腿，不rotation、不抓板。","Landing：板沿fall line，两脚同时接触落地区并连续屈腿。"],
["Approach, Takeoff, Maneuver, and Landing (ATML) 四段清楚。","起跳位置在台唇。","空中board和身体没有额外rotation。","落地后沿原路线滑行。"],
["进场反复刹车。","在台唇前已完全伸直。","空中只弯腰，腿没有收起。","后脚先落或落地后立即横板。"],"先做速度检查，不加 trick。能落在 landing zone 后只增加一个主动伸腿动作；录像检查后脚到台唇的时机。"),
activity("50–50",["Small box","Forward","Board parallel to feature"],
["50–50 是snowboard与箱体方向平行，不是横板。","Active movement to land on the box 是主动离雪并把两脚放上箱面，不靠箱头撞上去。","两脚均衡承压 是pressure在两脚之间。","不漂移看的是全程相对箱体的方向与横向位置。"],
["Approach：直线对准箱体，所有减速在上箱前完成。","Takeoff：主动伸腿离雪，两脚把板放到箱面中心附近。","Maneuver：板与箱平行、两脚承压、板底平。","Landing：沿前进方向离箱，两脚落地并吸收。"],
["三段方向一致。","板底平放，刃不抓箱。","板不漂出箱体边缘。","落地后继续前进。"],
["最后一刻转板斜向上箱。","髋落在后脚外。","用刃修正方向。","离箱时单脚先落或身体rotation。"],"先在雪面沿直线做 50–50，连续保持板平和两脚承压后，再选择宽、低、直的小箱。")],supporting:["beginner进阶","Ollie / Nollie","Nose / Tail Press","Funnel Turns","Pitch Changes","Lane Changes","Flatland 360s","Pivot Slip","Straight Air 公园外","50–50 雪面","On-Snow Edge Change"],checks:["我能复述 考官 给出的 desired outcome","我能在六类 核心中整合六个 Snowboard Technical Fundamentals","我能按指令突出一个 individual Snowboard Technical Fundamental","我能用 Duration, Intensity, Rate, and Timing (DIRT) 改变弯形、大小或路线","我能用一条因果链分析自己和他人","我能给 beginner 一个具体prescription","我能在 20 分钟内完成评估、练习和复盘","我在学生角色和移动途中仍保持专业与安全"]},
2:{roman:"II",color:"#176b9a",title:"二级｜在intermediate到部分advanced环境中持续适应",summary:"二级分为 Movement Analysis & Technical Understanding、Riding、Teaching & People Skills 三个独立模块，可分开完成。Riding仍需整合全部六个 Snowboard Technical Fundamentals；难点在更复杂地形、小型自由式项目、参数变化和持续适应。",terrain:["intermediate区域","Blue与部分简单Black","小型自由式地形"],structure:["3 个独立模块","Riding：10 个指定活动","通常每项观察 2 次，共 20 次","2 次 Personal Performance Analysis + 2 次 Movement Analysis","Teaching 30–40 分钟"],modules:[
["Riding Performance","六个 核心综合 活动、两个突出指定 individual Snowboard Technical Fundamental 的活动、两个 Highlight 或 Versatility 活动；移动和 freeride 也可成为适应能力证据。"],
["Movement Analysis / Technical Understanding","用两个或以上 Snowboard Technical Fundamentals，在同一两个phases of the turn或两个 Approach, Takeoff, Maneuver, and Landing (ATML) 阶段解释生物力学、物理和因果；prescription也要连接两个或以上 Snowboard Technical Fundamentals。"],
["Teaching & People Skills","围绕 intermediate重点项目 完成 30–40 分钟Teaching。周期性复查动机、表现和理解，并基于小组变化调整练习、地形、沟通与风险管理。"]],activities:[
activity("Skidded Turns",["Blue / Black","Small","Closed","Flexing Edge Change","Separation"],
["Small 是约一条压雪机履带宽，约 4.5 米；不是把Medium单纯加快。","Flexing Edge Change 表示edge change前踝膝髋处于较屈位置，以减少old edgepressure。","Separation 是腿和板能在上身下方转动，不是把肩固定死或故意反拧。","Closed 要求每个短弯越过fall line并朝山侧完成，不能用Open小摆替代。"],
["旧弯末继续屈腿释放pressure。","板在身体下快速edge change，上身沿计划路线移动。","腿部rotation控制 pivot，板持续Skidded。","Closed Turn形控速，不额外横推。"],
["窄corridor内每弯完整Closed。","上身相对稳定，腿部rotation更明显。","edge change时没有向上弹。","蓝／Black上速度不持续增加。"],
["短弯变成左右摆尾。","肩膀快速反甩。","edge change向上弹，与 flexing 参数相反。","越滑越快，靠大刹车重置。"],"画约 4.5 米corridor，每次板头越过fall line后再edge change；以头部高度作参照，edge change时不向上弹。"),
activity("Carved Turns",["Blue","Large","Carved","Aligned"],
["Blue受力更高，仍以板尾沿板头的单线轨迹判定 carved。","Aligned 是上身与板大体一起工作，不等于关节僵硬。","活动清单未固定edge change方式或弯形，考官增加的参数必须执行。"],
["提前释放old edge并建立new edge。","initiation phase至control phase逐步增加 tilt。","腿调节不断增加的pressure。","身体继续进入下一弯，不被旧弯拉到后脚。"],
["左右弧线连续单线。","edge angle与pressure逐步变化。","Largecorridor和速度匹配。","改变 Duration, Intensity, Rate, and Timing (DIRT) 后仍保持 Carved结果。"],
["initiation phase宽痕、弯底窄痕。","弯底 snowboard连续振动。","髋落后，completion phase才突然回正。","占用不安全宽度。"],"用三条履带宽corridor。先要求edge change后立即单线，再要求弯底无 snowboard连续振动，分别调整edging时机和屈腿时机。"),
activity("Off-Piste / Bumps",["Blue / Black","Medium","Skidded","Separation"],
["Medium 约 9 米，但实际转点受地形影响；总体弯幅符合参数即可。","Separation 让腿吸收并转板，上身继续沿计划路线。","路线可以调整，desired outcome 不能遇到变化就消失。"],
["看两到三个地形单元并确定路线。","凸起处屈腿，凹处伸腿。","在身体下用腿转板并保持skid。","用Medium形状控速。"],
["路线连续且有选择。","头部路径比snowboard平顺。","pressure可调，落差后不爆冲。","速度、弯幅与 Separation 持续存在。"],
["只在包顶转板，包间直冲。","上身随每个包大幅摆动。","板频繁离雪。","停下重置才能继续。"],"出发前口头报未来三个转点。录像只检查头部路径和board接触，达标后再缩短反应时间。"),
activity("Switch",["Blue","Small","Switch","Aligned"],
["约 4.5 米corridor，两侧必须连续、等质。","Aligned 要求上身与板大体一起工作，减少肩膀抢先转向。","没有固定 open/closed 或 edge-change 时，以当天 desired outcome 为准。"],
["视线沿switch方向，肩髋不过度预转。","两侧edge change都由踝膝髋跨板完成。","腿产生 pivot 与 twist。","保持连续节奏，不用forward traverse 重置。"],
["heel 与 toe 弯幅和速度接近。","能做路线和交通判断。","没有一侧依赖甩肩。","Blue连续复现。"],
["某侧变成 falling leaf。","肩先转 90°、板尾随后甩出。","只看脚下。","三弯后需停下或切forward。"],"同一corridor分别forward和switch录像，比较edge change位置、completion phase方向和用时，不比较主观外观。"),
activity("Air 180",["Small jump","Forward or switch","Two-footed or ollie","Land in fall line"],
["forward或switch进场、双脚或 ollie 起跳都可；选择必须支持稳定结果。","Pivot 180 应在主动起跳后完成；pre-spin 会改变离台方向。","Land in fall line 是落地瞬间板已沿fall line，不是落地后再扭正。","落地区屈腿吸收；手触雪或横板补救说明pressure或方向未控制。"],
["Approach：稳定速度、板沿fall line。","Takeoff：主动离台，板仍沿fall line。","Maneuver：收腿并完成 180°。","Landing：板沿fall line、两脚承压、屈腿滑走。"],
["无明显 pre-spin。","rotation量在空中完成。","两脚落地，center of mass (CM)位于base of support。","能解释进场方向选择。"],
["台唇前板已横转。","空中腿伸直。","不足或过转后靠横板修正。","换进场方向后结构崩溃。"],"分开练 flat 180、straight air，再在小跳台合并；不要同时增加速度。"),
activity("Nose / Tail Press",["Small box","Forward approach / exit","Hold entire feature","Minimize pivot / edging"],
["Press 要把pressure明确移到 nose 或 tail，并保持整个 feature；只抬一下不算。","Fore/aft movement 是身体相对base of support的移动与关节调节，不是折腰。","板与箱方向保持一致、板底尽量平。","前进方向上箱和出箱，不能用rotation下箱掩盖失衡。"],
["直线进场并稳定速度。","板平放上箱后把pressure移向目标端。","目标端承压，另一端减压，全程不转板、不edging。","回到两脚之间，前进方向离箱。"],
["press 从箱头附近保持到箱尾。","被减压端明显变轻。","板不横漂、不用刃纠正。","离箱前回到两脚平衡。"],
["只在箱中间短暂抬板。","弯腰制造外观，pressure未移动。","髋移到base of support外。","板发生 pivot 或刃触箱。"],"先在雪面做约 10 英尺 press，录像检查髋部与承压脚关系；再上宽箱，只增加‘保持全程’。")],supporting:["Carved Turns：小Open Turn／Separation","Switch Off-Piste / Bumps","Switch Carved Turns","Grab","Air 180 公园外","Nose / Switch Nose Rolls","Shifty","Air Edge Change","Edge Change on Transition","toe edge到toe edge 雪面（两种）","heel edge到heel edge 雪面","Pivot Slip","Aired Edge Changes","Funnel Turns","Pitch Changes","Lane Changes","Edge Tap","Nose or Tail Press outside box","Shorts Around Longs"],checks:["我能复述 10 个 Riding 活动结构","我能在六类 核心中整合全部 Snowboard Technical Fundamentals","改变参数后仍保持 desired outcome","我能用两个 Snowboard Technical Fundamentals 解释同一阶段","prescription包含动作、时机和结果","我会周期性重评学生","我能基于证据改变练习或地形","freeride 和学生角色仍提供正面证据"]},
3:{roman:"III",color:"#11191e",title:"三级｜在全地形与并发变量中持续得到指定结果",summary:"三级也是三个独立模块。重点不是夸张动作，而是在advanced地形和中型自由式项目中持续整合全部六个 Snowboard Technical Fundamentals、按要求突出一个或多个，并在任务或雪况变化前主动调整。",terrain:["advanced区域","所有地形／专家Black","中型自由式地形"],structure:["3 个独立模块","Riding：10 个指定活动","通常每项观察 2 次，共 20 次","2 次 Personal Performance Analysis + 2 次 Movement Analysis","Teaching 30–40 分钟"],modules:[
["Riding Performance","六个 核心综合 活动、两个突出指定 individual Snowboard Technical Fundamental 的活动、两个 Highlight 或 Versatility 活动；全地形移动和 freeride 也提供持续性与适应性证据。"],
["Movement Analysis / Technical Understanding","用三个或以上 Snowboard Technical Fundamentals 解释它们在全部转弯或 Approach, Takeoff, Maneuver, and Landing (ATML) 阶段如何相互影响；prescription连接三个或以上 Snowboard Technical Fundamentals。"],
["Teaching & People Skills","围绕 advanced重点项目 完成 30–40 分钟Teaching。在共同主题下为每个人定制任务，持续评估并主动管理风险、动机和群体关系。"]],activities:[
activity("Skidded Turns",["Black","Small","Closed","Retracting Edge Change","Separation"],
["Retracting 是快速屈踝膝髋，把板拉向center of mass (CM)；center of mass (CM)本身没有明显上下抛动。","Black + Small + Closed 要求陡坡窄corridor内每弯完成控速；快速左右扫板但板头不越fall line不算。","Separation 要让腿在上身下快速edge change、转板，上身沿计划路线移动。"],
["completion phase腿继续变短，释放old edge。","把板收过身体下方，center of mass (CM)高度变化较小。","腿向新方向伸出并建立pressure。","腿转板形成连续Skidded，Closed Turn形控速。"],
["速度不随弯数累积。","头和躯干路径平顺。","每弯可辨认edge change、控制和完成。","改变 Duration, Intensity, Rate, and Timing (DIRT) 后可恢复 desired outcome。"],
["用全身上跳edge change。","板横扫fall line，缺少圆弧。","肩膀反复甩动。","疲劳后弯形打开却不调整。"],"先在Blue以头部高度作参照，要求板在身体下通过；确认Retracting Edge Change后再逐步增加坡度。"),
activity("Carved Turns",["Black","Large","Closed","Retracting","Separation"],
["详细参数来自 Activities List 的 Movement Analysis Core Activities速查；活动页只写 Carved / Large，当天参数优先。","三级 carved 是高负荷下仍保持单线、完整弯形和可管理pressure，不是单看高edge angle。","Retracting 快速释放old edge；Separation 让腿和板在上身下换边。","Closed Large需要足够空间和交通判断。"],
["收腿卸掉old edgepressure，身体继续进入下一弯。","腿向新弯伸出并逐步增加 tilt。","用flexion and extension调节pressure，保持板尾沿板头轨迹。","Closed弧线并为下一次释放保留关节范围。"],
["Black高负荷下仍为单线。","pressure沿弯分布，不在弯底爆发。","上下身分工清楚。","路线、净空和速度安全。"],
["center of mass (CM)过度在弯内，无法释放。","弯底 snowboard连续振动 或板尾skid。","上身提前rotation，initiation phase先 pivot。","为保持 Carved 忽略交通。"],"分三次验证：单线、无 snowboard连续振动、加入Retracting Edge Change。一次只改一个 Duration, Intensity, Rate, and Timing (DIRT) 变量。"),
activity("Off-Piste / Bumps",["Black","Small","Closed","Retracting","Separation"],
["详细参数来自 Movement Analysis Core Activities速查；当天活动可因地形雪况调整。","Small + Closed 要求复杂地形中仍完成弯，不只是包顶Open pivot。","Retracting 同时服务于edge change与吸收；要协调二者，不能一次用尽关节范围。","路线选择必须预判多个转点。"],
["观察至少三个地形单元并选主线和备选线。","凸起收腿吸收并释放，凹处伸腿维持接触。","腿在上身下转板形成短Closed Turn。","变化前主动调整 Duration, Intensity, Rate, and Timing (DIRT)、弯形或路线。"],
["路线连续且能解释依据。","board接触稳定、头部路径平顺。","短弯Closed并持续控速。","调整发生在失衡或加速之前。"],
["center of mass (CM)落后，板头无法进入转点。","只吸收不extension。","地形变化后固定节奏中断。","每个包都靠上身rotation补救。"],"出发前说出主线、备选线和切换条件；录像检查切换发生在速度变化前还是之后。"),
activity("Switch",["Blue / Black","Small","Closed","Retracting","Separation"],
["三级switch也要执行Retracting Edge Change、Separation、短Closed Turn和 Duration, Intensity, Rate, and Timing (DIRT) 变化。","Blue / Black 由考官按条件选择；Blue表现不能自动证明Black参数。","switch不能降低安全观察和路线计划。"],
["以switch方向观察路线。","completion phase收腿释放，板在身体下换边。","腿独立转板，完成短ClosedSkidded Turn。","按坡度、雪质和指令改变 Duration, Intensity, Rate, and Timing (DIRT)。"],
["heel/toe 两侧质量接近。","Retracting Edge Change和 Separation 清楚。","高负荷下速度仍由弯形控制。","交通判断与forward同等级。"],
["一侧退化为 traverse。","edge change上跳或甩肩。","陡坡上弯形打开、速度累积。","只看上坡侧。"],"同一路线先forward再switch，以edge change位置、completion phase方向、速度变化和头部路径比较，不降低switch标准。"),
activity("Air 360",["Small jump","Frontside or backside","Board in fall line at takeoff / landing"],
["合适速度并提前定刃 要支持完整rotation并到达 landing zone；不能在台唇继续修方向。","干净起跳 可双脚或板尾起跳；后脚到台唇时板沿fall line。","收双腿缩小转动惯量并提供调节空间。","落地瞬间板已沿fall line，不是触雪后补角度。"],
["Approach：确定方向、速度和 edge-set。","Takeoff：后脚到台唇时主动离台。","Maneuver：双腿收起并完成 360°。","Landing：打开双腿，沿fall line两脚落地并吸收。"],
["frontside 或 backside 按指令完成。","无明显 pre-spin。","rotation速度与 landing zone 匹配。","落地后沿路线滑走。"],
["最后 setup turn 过大。","台唇前先转板。","腿未收起，无法调节。","不足／过转、单脚落或手触雪。"],"分别录像 approach 最后两秒、台唇瞬间和落地第一帧；先修第一个方向不一致的阶段。"),
activity("Boardslide",["Small box","Forward approach / exit","60–120°","Feature between feet"],
["必须用 pop 与 Separation 跳上 feature，不是从箱头旋上去。","板相对箱体横 60–120°，且箱体在两脚之间。","角度和pressure保持全程，不能中途转回 50–50。","主动 pop 离箱，转回前进方向并两脚落地。"],
["直线进场并提前调速。","主动 pop，Separation使板rotation。","两脚分列箱体两侧，板底平，角度保持。","主动离箱，板转回前进方向。"],
["上箱角度在范围内。","箱体位于两脚之间。","全程不明显edging或横漂。","离箱后前进方向两脚落地。"],
["从箱头 pivot 上箱。","箱体落在两脚外侧。","中途转回平行或用刃修正。","直接掉下箱，落地仍横板。"],"先用雪面直线模拟箱体，完成 pop-on、保持 90°、pop-off 三段，再上宽低箱。")],supporting:["Switch Carved Turns：小Open／大Closed","Switch Off-Piste / Bumps","Nose/Tail Rolls, Spins, Butters","Flatland 360s in Bumps","Transition Air Edge Change","Aired Edge Change","toe edge到toe edge 空中","heel edge到heel edge 空中","Pivot Slip","Dolphin Turns across fall line","Dolphin Turns down fall line","Funnel Turns","Pitch Changes","Lane Changes","Edge Tap","Shorts Around Longs","Trifecta","Air 360 公园外","Nose / Tail Slide","Hop Turn"],checks:["我能复述 10 个 Riding 活动结构","我能在全地形整合全部 Snowboard Technical Fundamentals","我能在变化前主动调整","我能解释三个 Snowboard Technical Fundamentals 的相互影响","prescription连接三个 Snowboard Technical Fundamentals","我能为每个人设置不同任务","我能提前管理风险","freeride、疲劳或角色变化不降低表现"]}}
;

const terms=[
  ["CM / Base of Support","身体相对双脚和 snowboard 的位置。","说明髋部在双脚前后或两侧的具体位置。"],
  ["Fore/Aft Pressure","把 pressure 移向 nose、两脚之间或 tail。","说明移动发生在哪一个 turn phase。"],
  ["Heel/Toe Pressure","让 pressure 移向 heelside 或 toeside。","说明 CM 何时越过 snowboard。"],
  ["Pressure Magnitude","通过身体动作、line 和 terrain 调节 snowboard 与雪面的作用力。","说明 pressure 在哪里增加或减少。"],
  ["Pivot","用 flexion、extension 和 rotation 控制 snowboard 改变方向。","区分腿部动作与肩部甩动。"],
  ["Tilt","用 inclination 和 angulation 控制 edge angle。","说明 edge angle 在哪个 turn phase 建立。"],
  ["Twist","让 snowboard 两端出现不同 edge angle。","说明前后脚动作顺序。"],
  ["Duration, Intensity, Rate, and Timing (DIRT)","动作持续多久、幅度多大、变化多快、何时发生。","用来解释动作变化如何改变 desired outcome。"],
  ["Approach, Takeoff, Maneuver, and Landing (ATML)","自由式项目的四个观察阶段。","逐段说明身体动作、snowboard 表现和结果。"],
  ["Extending Edge Change","edge change 前双腿接近本次动作范围内最长。","随后仍要恢复 flexion。"],
  ["Flexing Edge Change","edge change 前踝、膝、髋处于较短位置。","通过 flexion 减少 old-edge pressure。"],
  ["Retracting Edge Change","快速缩短双腿，让 snowboard 从身体下方通过。","CM 不应出现明显向上弹起。"],
  ["Skidded Turn","snowboard 向前移动时同时发生连续、可控的横向滑动。","tail 的轨迹位于 nose 轨迹外侧。"],
  ["Carved Turn","tail 沿 nose 的轨迹通过，雪面留下窄而连续的单线。","不能用速度或 edge angle 单独判断。"],
  ["Open / Closed","Open 保留更多下坡方向；Closed 更充分越过 fall line。","必须同时看 turn shape 和完成方向。"],
  ["Turn Size","Small、Medium、Large 由 corridor 宽度判断。","约一、二、三条 groomer track。"],
  ["Aligned / Separation","Aligned 时上身与 snowboard 大体一起转；Separation 时腿和 snowboard 能独立转动。","Separation 不等于把肩膀锁死。"],
  ["Movement Analysis","Observe → Evaluate → Prescribe。","先说事实，再解释 cause and effect，最后给出可执行改变。"]
];
const panel=document.querySelector("#level-panel"),tabs=[...document.querySelectorAll('[role="tab"]')],checklist=document.querySelector("#checklist");
const ul=a=>`<ul>${a.map(x=>`<li>${x}</li>`).join("")}</ul>`;
function renderLevel(n){const l=levels[n];panel.style.setProperty("--level-color",l.color);panel.innerHTML=`<div class="level-summary"><div class="level-number">${l.roman}</div><div><h2>${l.title}</h2><p>${l.summary}</p><div class="terrain-chips">${l.terrain.map(x=>`<span>${x}</span>`).join("")}</div></div></div><div class="assessment-structure">${l.structure.map((x,i)=>`<div><b>${String(i+1).padStart(2,"0")}</b><span>${x}</span></div>`).join("")}</div><div class="module-grid">${l.modules.map(x=>`<article><h3>${x[0]}</h3><p>${x[1]}</p></article>`).join("")}</div><div class="activity-section"><div class="activity-section-title"><div><span>Riding · Core Integrated Activities</span><h2>六个Core Activities逐项拆解</h2></div><p>每项通常有两次计划观察。单项不单独判通过；全部项目共同证明三件事：综合运用全部技术基本功、按要求突出某一项技术基本功，以及通过Duration, Intensity, Rate, and Timing (DIRT)展示变化能力。</p></div><div class="activity-details">${l.activities.map((a,i)=>`<details class="activity-detail" ${i===0?"open":""}><summary><span class="activity-index">${String(i+1).padStart(2,"0")}</span><span class="activity-name">${a.name}<small>${a.params.join(" · ")}</small></span><span class="detail-action">展开</span></summary><div class="activity-body"><section class="parameter-reading"><h3>考生必须注意｜逐字理解参数</h3>${ul(a.wording)}</section><section><h3>考生必须注意｜执行顺序</h3>${ul(a.sequence)}</section><section><h3>考生必须做到｜让考官看到这些证据</h3>${ul(a.evidence)}</section><section class="miss"><h3>考生必须避免｜这些表现会削弱证据</h3>${ul(a.misses)}</section><p class="training-cue"><strong>考生训练指令</strong>${a.drill}</p></div></details>`).join("")}</div></div><details class="supporting-pool"><summary>Supporting Activity Pool｜可能用于突出单项技术或展示变化能力 <span>${l.supporting.length} 项</span></summary><div>${l.supporting.map(x=>`<span>${x}</span>`).join("")}</div><p>Supporting Activity只是展示评分标准的另一种环境。考官会说明当天参数和desired outcome；项目名称本身不是评分标准。</p></details>`;panel.setAttribute("aria-labelledby",`tab-${n}`);renderChecks(n)}
function renderChecks(n){checklist.innerHTML=levels[n].checks.map(x=>`<label class="check-item"><input type="checkbox"><span>${x}</span></label>`).join("");updateChecks()}
function updateChecks(){const n=checklist.querySelectorAll("input:checked").length;document.querySelector("#check-score").textContent=`${n}/8`;document.querySelector("#check-message").textContent=n<4?"优先训练未勾选项。":n<8?"把未勾选项改写成下一次训练任务。":"换地形、速度和雪况复测。"}
tabs.forEach((t,i)=>{t.addEventListener("click",()=>{tabs.forEach(x=>{x.setAttribute("aria-selected","false");x.tabIndex=-1});t.setAttribute("aria-selected","true");t.tabIndex=0;renderLevel(t.dataset.level)});t.addEventListener("keydown",e=>{if(!["ArrowLeft","ArrowRight"].includes(e.key))return;const j=e.key==="ArrowRight"?(i+1)%3:(i+2)%3;tabs[j].click();tabs[j].focus()})});
const grid=document.querySelector("#term-grid"),filter=document.querySelector("#term-filter");function renderTerms(q=""){const s=q.trim().toLowerCase(),shown=terms.filter(t=>t.join(" ").toLowerCase().includes(s));grid.innerHTML=shown.map(t=>`<article class="term-card"><h3>${t[0]}</h3><p>${t[1]}</p><p class="term-use">${t[2]}</p></article>`).join("");document.querySelector("#term-count").textContent=`${shown.length} / ${terms.length} terms`};filter.addEventListener("input",e=>renderTerms(e.target.value));
const candidateText = new WeakMap();
let officialView = false;
const officialTerms = [];
function toOfficial(text){return officialTerms.reduce((value,[plain,official])=>value.split(plain).join(official),text)}
function applyView(root=document.body){
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  nodes.forEach(node=>{if(!candidateText.has(node))candidateText.set(node,node.nodeValue);node.nodeValue=officialView?toOfficial(candidateText.get(node)):candidateText.get(node)});
  document.body.classList.toggle("examiner-view",officialView);
}
const originalRenderLevel=renderLevel;
const examinerModuleCore=[
  "Integrate all Snowboard Technical Fundamentals, highlight the prescribed individual fundamental, and demonstrate versatility through DIRT.",
  "Observe performance, identify cause and effect, and prescribe a change at the depth required for the certification level.",
  "Assess, plan, implement, adapt, and reflect while meeting Teaching & People Skills and Professionalism & Self-Management criteria."
];
renderLevel=function(n){
  originalRenderLevel(n);
  if(!officialView)return;
  const level=levels[n];
  panel.querySelectorAll(".module-grid article").forEach((article,i)=>{article.querySelector("p").textContent=examinerModuleCore[i]});
  panel.querySelectorAll(".activity-detail").forEach((detail,i)=>{
    const a=level.activities[i],body=detail.querySelector(".activity-body");
    body.classList.add("examiner-brief");
    body.innerHTML=`<section class="examiner-criterion parameters"><h3>Assessment Activity Parameters</h3><p>${a.params.join(" · ")}</p></section><section class="examiner-criterion success"><h3>Successful Performance Contributors</h3>${ul(a.evidence.slice(0,3))}</section><section class="examiner-criterion unsuccessful"><h3>Unsuccessful Performance Contributors</h3>${ul(a.misses.slice(0,2))}</section>`;
  });
  applyView(panel);
};
document.querySelector("#examiner-toggle").addEventListener("click",e=>{
  officialView=!officialView;e.currentTarget.setAttribute("aria-pressed",String(officialView));
  renderLevel(document.querySelector('[role="tab"][aria-selected="true"]').dataset.level);
  applyView();e.currentTarget.textContent=officialView?"切换到考生详细版":"切换到考官核心版";
  if(officialView)document.querySelectorAll(".activity-detail").forEach(d=>d.open=true);
});
checklist.addEventListener("change",updateChecks);renderLevel(1);renderTerms();

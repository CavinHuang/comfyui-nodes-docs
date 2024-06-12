# Documentation
- Class name: CR_RandomLoRAStack
- Category: Comfyroll/LoRA
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_RandomLoRAStack节点旨在将LoRA（低秩适应）模块随机堆叠到基础模型上。它根据指定的权重、机会和独占性设置智能地处理LoRA模块的选择和应用，确保模型能力的多样化和可控增强。

# Input types
## Required
- exclusive_mode
    - 独占模式决定是否一次只能应用一个LoRA。设置为'On'时，它强制执行互斥性，确保节点的操作是非冗余且专注的。
    - Comfy dtype: COMBO['Off', 'On']
    - Python dtype: str
- stride
    - 步长定义了节点重新评估LoRA堆叠的间隔。它对于控制LoRA应用的频率至关重要，从而影响节点的整体性能。
    - Comfy dtype: INT
    - Python dtype: int
- force_randomize_after_stride
    - 启用此参数后，节点会在一定数量的步长后随机化LoRA选择，为节点的操作增加了不可预测性的元素。
    - Comfy dtype: COMBO['Off', 'On']
    - Python dtype: str
- lora_name_1
    - 要考虑堆叠的第一个LoRA模块。它的选择可以显著改变节点的功能，引入新特性或修改现有特性。
    - Comfy dtype: STRING
    - Python dtype: str
- chance_1
    - 应用第一个LoRA模块的概率。它在节点操作的随机性中扮演着关键角色，允许一定程度的可控不可预测性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- model_weight_1
    - 分配给第一个LoRA模块的权重，影响它对节点最终输出的影响程度。它是微调节点行为的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- clip_weight_1
    - 第一个LoRA模块的剪辑权重，可以帮助控制LoRA对节点输出影响的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- switch_1
    - 决定第一个LoRA模块是否激活的开关。它是一种简单而有效的方法，用于在节点操作中切换LoRA模块的包含。
    - Comfy dtype: COMBO['Off', 'On']
    - Python dtype: str
## Optional
- lora_name_2
    - 可以考虑用于堆叠的第二个LoRA模块，为增强节点的能力提供额外选项。
    - Comfy dtype: STRING
    - Python dtype: str
- chance_2
    - 与第二个LoRA模块相关联的概率，进一步促成了节点的随机行为。
    - Comfy dtype: FLOAT
    - Python dtype: float
- model_weight_2
    - 第二个LoRA模块的权重，允许对它对节点输出的贡献进行细微控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- clip_weight_2
    - 第二个LoRA模块的剪辑权重，提供了一种调整其对节点结果影响的机制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- switch_2
    - 第二个LoRA模块的开关，允许在节点过程中灵活控制其激活。
    - Comfy dtype: COMBO['Off', 'On']
    - Python dtype: str
- lora_name_3
    - 堆叠的第三个LoRA模块选项，为节点的潜在功能提供进一步的多样性。
    - Comfy dtype: STRING
    - Python dtype: str
- chance_3
    - 第三个LoRA模块的概率，为节点的操作增加了另一层随机性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- model_weight_3
    - 分配给第三个LoRA模块的权重，影响它在堆叠中对节点输出的效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- clip_weight_3
    - 第三个LoRA模块的剪辑权重，允许对它对节点最终结果的影响进行细粒度控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- switch_3
    - 第三个LoRA模块的开关，提供包含或排除它在节点操作中的选项。
    - Comfy dtype: COMBO['Off', 'On']
    - Python dtype: str
- lora_stack
    - 可以预应用于节点的LoRA模块的可选堆叠。这允许在进一步随机化之前进行自定义和预设LoRA堆叠。
    - Comfy dtype: LORA_STACK
    - Python dtype: List[Tuple[str, float, float]]

# Output types
- lora_stack
    - 输出是已根据输入参数随机选择和加权的LoRA模块堆叠。这个堆叠在根据节点配置修改基础模型的行为方面起着关键作用。
    - Comfy dtype: LORA_STACK
    - Python dtype: List[Tuple[str, float, float]]

# Usage tips
- Infra type: CPU

# Source code
```
class CR_RandomLoRAStack:

    @classmethod
    def INPUT_TYPES(cls):
        loras = ['None'] + folder_paths.get_filename_list('loras')
        return {'required': {'exclusive_mode': (['Off', 'On'],), 'stride': ('INT', {'default': 1, 'min': 1, 'max': 1000}), 'force_randomize_after_stride': (['Off', 'On'],), 'lora_name_1': (loras,), 'switch_1': (['Off', 'On'],), 'chance_1': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'model_weight_1': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'clip_weight_1': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'lora_name_2': (loras,), 'switch_2': (['Off', 'On'],), 'chance_2': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'model_weight_2': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'clip_weight_2': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'lora_name_3': (loras,), 'switch_3': (['Off', 'On'],), 'chance_3': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'model_weight_3': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'clip_weight_3': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01})}, 'optional': {'lora_stack': ('LORA_STACK',)}}
    RETURN_TYPES = ('LORA_STACK',)
    FUNCTION = 'random_lora_stacker'
    CATEGORY = icons.get('Comfyroll/LoRA')
    UsedLorasMap = {}
    StridesMap = {}
    LastHashMap = {}

    @staticmethod
    def getIdHash(lora_name_1: str, lora_name_2: str, lora_name_3: str) -> int:
        id_set = set([lora_name_1, lora_name_2, lora_name_3])
        id_hash = hash(frozenset(id_set))
        return id_hash

    @staticmethod
    def deduplicateLoraNames(lora_name_1: str, lora_name_2: str, lora_name_3: str):
        is_same_1 = False
        is_same_2 = False
        is_same_3 = False
        if lora_name_1 == lora_name_2:
            is_same_1 = True
            is_same_2 = True
        if lora_name_1 == lora_name_3:
            is_same_1 = True
            is_same_3 = True
        if lora_name_2 == lora_name_3:
            is_same_2 = True
            is_same_3 = True
        if is_same_1:
            lora_name_1 = lora_name_1 + 'CR_RandomLoRAStack_1'
        if is_same_2:
            lora_name_2 = lora_name_2 + 'CR_RandomLoRAStack_2'
        if is_same_3:
            lora_name_3 = lora_name_3 + 'CR_RandomLoRAStack_3'
        return (lora_name_1, lora_name_2, lora_name_3)

    @staticmethod
    def cleanLoraName(lora_name) -> str:
        if 'CR_RandomLoRAStack_1' in lora_name:
            lora_name = lora_name.replace('CR_RandomLoRAStack_1', '')
        elif 'CR_RandomLoRAStack_2' in lora_name:
            lora_name = lora_name.replace('CR_RandomLoRAStack_2', '')
        elif 'CR_RandomLoRAStack_3' in lora_name:
            lora_name = lora_name.replace('CR_RandomLoRAStack_3', '')
        return lora_name

    @classmethod
    def IS_CHANGED(cls, exclusive_mode, stride, force_randomize_after_stride, lora_name_1, model_weight_1, clip_weight_1, switch_1, chance_1, lora_name_2, model_weight_2, clip_weight_2, switch_2, chance_2, lora_name_3, model_weight_3, clip_weight_3, switch_3, chance_3, lora_stack=None):
        lora_set = set()
        (lora_name_1, lora_name_2, lora_name_3) = CR_RandomLoRAStack.deduplicateLoraNames(lora_name_1, lora_name_2, lora_name_3)
        id_hash = CR_RandomLoRAStack.getIdHash(lora_name_1, lora_name_2, lora_name_3)
        if id_hash not in CR_RandomLoRAStack.StridesMap:
            CR_RandomLoRAStack.StridesMap[id_hash] = 0
        CR_RandomLoRAStack.StridesMap[id_hash] += 1
        if stride > 1 and CR_RandomLoRAStack.StridesMap[id_hash] < stride and (id_hash in CR_RandomLoRAStack.LastHashMap):
            return CR_RandomLoRAStack.LastHashMap[id_hash]
        else:
            CR_RandomLoRAStack.StridesMap[id_hash] = 0
        total_on = 0
        if lora_name_1 != 'None' and switch_1 == 'On' and (chance_1 > 0.0):
            total_on += 1
        if lora_name_2 != 'None' and switch_2 == 'On' and (chance_2 > 0.0):
            total_on += 1
        if lora_name_3 != 'None' and switch_3 == 'On' and (chance_3 > 0.0):
            total_on += 1

        def perform_randomization() -> set:
            _lora_set = set()
            rand_1 = random()
            rand_2 = random()
            rand_3 = random()
            apply_1 = True if rand_1 <= chance_1 and switch_1 == 'On' else False
            apply_2 = True if rand_2 <= chance_2 and switch_2 == 'On' else False
            apply_3 = True if rand_3 <= chance_3 and switch_3 == 'On' else False
            num_to_apply = sum([apply_1, apply_2, apply_3])
            if exclusive_mode == 'On' and num_to_apply > 1:
                rand_dict = {}
                if apply_1:
                    rand_dict[1] = rand_1
                if apply_2:
                    rand_dict[2] = rand_2
                if apply_3:
                    rand_dict[3] = rand_3
                sorted_rands = sorted(rand_dict.keys(), key=lambda k: rand_dict[k])
                if sorted_rands[0] == 1:
                    apply_2 = False
                    apply_3 = False
                elif sorted_rands[0] == 2:
                    apply_1 = False
                    apply_3 = False
                elif sorted_rands[0] == 3:
                    apply_1 = False
                    apply_2 = False
            if lora_name_1 != 'None' and switch_1 == 'On' and apply_1:
                _lora_set.add(lora_name_1)
            if lora_name_2 != 'None' and switch_2 == 'On' and apply_2:
                _lora_set.add(lora_name_2)
            if lora_name_3 != 'None' and switch_3 == 'On' and apply_3:
                _lora_set.add(lora_name_3)
            return _lora_set
        last_lora_set = CR_RandomLoRAStack.UsedLorasMap.get(id_hash, set())
        lora_set = perform_randomization()
        if force_randomize_after_stride == 'On' and len(last_lora_set) > 0 and (total_on > 1):
            while lora_set == last_lora_set:
                lora_set = perform_randomization()
        CR_RandomLoRAStack.UsedLorasMap[id_hash] = lora_set
        hash_str = str(hash(frozenset(lora_set)))
        CR_RandomLoRAStack.LastHashMap[id_hash] = hash_str
        return hash_str

    def random_lora_stacker(self, exclusive_mode, stride, force_randomize_after_stride, lora_name_1, model_weight_1, clip_weight_1, switch_1, chance_1, lora_name_2, model_weight_2, clip_weight_2, switch_2, chance_2, lora_name_3, model_weight_3, clip_weight_3, switch_3, chance_3, lora_stack=None):
        lora_list = list()
        if lora_stack is not None:
            lora_list.extend([l for l in lora_stack if l[0] != 'None'])
        (lora_name_1, lora_name_2, lora_name_3) = CR_RandomLoRAStack.deduplicateLoraNames(lora_name_1, lora_name_2, lora_name_3)
        id_hash = CR_RandomLoRAStack.getIdHash(lora_name_1, lora_name_2, lora_name_3)
        used_loras = CR_RandomLoRAStack.UsedLorasMap.get(id_hash, set())
        if lora_name_1 != 'None' and switch_1 == 'On' and (lora_name_1 in used_loras):
            (lora_list.extend([(CR_RandomLoRAStack.cleanLoraName(lora_name_1), model_weight_1, clip_weight_1)]),)
        if lora_name_2 != 'None' and switch_2 == 'On' and (lora_name_2 in used_loras):
            (lora_list.extend([(CR_RandomLoRAStack.cleanLoraName(lora_name_2), model_weight_2, clip_weight_2)]),)
        if lora_name_3 != 'None' and switch_3 == 'On' and (lora_name_3 in used_loras):
            (lora_list.extend([(CR_RandomLoRAStack.cleanLoraName(lora_name_3), model_weight_3, clip_weight_3)]),)
        return (lora_list,)
```
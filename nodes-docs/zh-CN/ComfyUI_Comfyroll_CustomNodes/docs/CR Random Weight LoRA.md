# Documentation
- Class name: CR_RandomWeightLoRA
- Category: Comfyroll/LoRA
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_RandomWeightLoRA 节点旨在为神经网络模型中的 LoRA（低秩适应）层动态分配随机权重。它通过调整特定 LoRA 层的影响，提供了一种将可变性和定制性引入模型性能的机制。该节点通过为给定参数集生成唯一哈希值来操作，然后使用该哈希值来确定是否应分配新的随机权重。这种方法确保了模型在适应不同输入条件的同时，其输出保持一定程度的不可预测性。

# Input types
## Required
- stride
    - 步幅参数对于确定节点操作的步长至关重要。它影响节点处理输入数据的频率，并且可以显著影响节点执行的效率和结果。
    - Comfy dtype: INT
    - Python dtype: int
- force_randomize_after_stride
    - 此参数指示节点是否应在一定数量的步幅后强制随机化权重。它对于控制随机性并确保节点不会陷入可预测的模式非常重要。
    - Comfy dtype: COMBO['Off', 'On']
    - Python dtype: str
- lora_name
    - LoRA 名称参数指定节点将针对哪个低秩适应层。这个选择至关重要，因为它决定了将对其权重进行随机化的特定层。
    - Comfy dtype: STRING
    - Python dtype: str
- switch
    - 开关参数作为启用或禁用节点随机权重分配特性的开关。它通过控制随机化过程是否激活，在节点的功能中扮演关键角色。
    - Comfy dtype: COMBO['Off', 'On']
    - Python dtype: str
- weight_min
    - weight_min 参数为可以分配给 LoRA 层的随机权重范围设定了下限。它对于定义节点操作的范围至关重要，并影响节点输出的可变性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- weight_max
    - weight_max 参数设置了随机权重范围的上限。它与 weight_min 配合使用，确保分配的权重落在指定的区间内，从而控制节点的行为。
    - Comfy dtype: FLOAT
    - Python dtype: float
- clip_weight
    - clip_weight 参数用于将分配的权重剪切或限制在某个特定值。它确保权重不会超过预定义的阈值，这对于维护节点操作的稳定性至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- lora_stack
    - 可选的 lora_stack 参数允许将额外的 LoRA 层包含在节点处理中。它提供了一种扩展节点能力并根据手头任务的具体要求定制其行为的方法。
    - Comfy dtype: LORA_STACK
    - Python dtype: List[Tuple[str, float, float]]

# Output types
- lora_stack
    - lora_stack 输出参数代表了节点执行后带有分配权重的修改后的 LoRA 层列表。它很重要，因为它传达了节点的最终输出，反映了应用于模型的定制。
    - Comfy dtype: LORA_STACK
    - Python dtype: List[Tuple[str, float, float]]

# Usage tips
- Infra type: GPU

# Source code
```
class CR_RandomWeightLoRA:

    @classmethod
    def INPUT_TYPES(cls):
        loras = ['None'] + folder_paths.get_filename_list('loras')
        return {'required': {'stride': ('INT', {'default': 1, 'min': 1, 'max': 1000}), 'force_randomize_after_stride': (['Off', 'On'],), 'lora_name': (loras,), 'switch': (['Off', 'On'],), 'weight_min': ('FLOAT', {'default': 0.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'weight_max': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'clip_weight': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01})}, 'optional': {'lora_stack': ('LORA_STACK',)}}
    RETURN_TYPES = ('LORA_STACK',)
    FUNCTION = 'random_weight_lora'
    CATEGORY = icons.get('Comfyroll/LoRA')
    LastWeightMap = {}
    StridesMap = {}
    LastHashMap = {}

    @staticmethod
    def getIdHash(lora_name: str, force_randomize_after_stride, stride, weight_min, weight_max, clip_weight) -> int:
        fl_str = f'{lora_name}_{force_randomize_after_stride}_{stride}_{weight_min:.2f}_{weight_max:.2f}_{clip_weight:.2f}'
        return hashlib.sha256(fl_str.encode('utf-8')).hexdigest()

    @classmethod
    def IS_CHANGED(cls, stride, force_randomize_after_stride, lora_name, switch, weight_min, weight_max, clip_weight, lora_stack=None):
        id_hash = CR_RandomWeightLoRA.getIdHash(lora_name, force_randomize_after_stride, stride, weight_min, weight_max, clip_weight)
        if switch == 'Off':
            return id_hash + '_Off'
        if lora_name == 'None':
            return id_hash
        if id_hash not in CR_RandomWeightLoRA.StridesMap:
            CR_RandomWeightLoRA.StridesMap[id_hash] = 0
        CR_RandomWeightLoRA.StridesMap[id_hash] += 1
        if stride > 1 and CR_RandomWeightLoRA.StridesMap[id_hash] < stride and (id_hash in CR_RandomWeightLoRA.LastHashMap):
            return CR_RandomWeightLoRA.LastHashMap[id_hash]
        else:
            CR_RandomWeightLoRA.StridesMap[id_hash] = 0
        last_weight = CR_RandomWeightLoRA.LastWeightMap.get(id_hash, None)
        weight = uniform(weight_min, weight_max)
        if last_weight is not None:
            while weight == last_weight:
                weight = uniform(weight_min, weight_max)
        CR_RandomWeightLoRA.LastWeightMap[id_hash] = weight
        hash_str = f'{id_hash}_{weight:.3f}'
        CR_RandomWeightLoRA.LastHashMap[id_hash] = hash_str
        return hash_str

    def random_weight_lora(self, stride, force_randomize_after_stride, lora_name, switch, weight_min, weight_max, clip_weight, lora_stack=None):
        id_hash = CR_RandomWeightLoRA.getIdHash(lora_name, force_randomize_after_stride, stride, weight_min, weight_max, clip_weight)
        lora_list = list()
        if lora_stack is not None:
            lora_list.extend([l for l in lora_stack if l[0] != 'None'])
        weight = CR_RandomWeightLoRA.LastWeightMap.get(id_hash, 0.0)
        if lora_name != 'None' and switch == 'On':
            (lora_list.extend([(lora_name, weight, clip_weight)]),)
        return (lora_list,)
```
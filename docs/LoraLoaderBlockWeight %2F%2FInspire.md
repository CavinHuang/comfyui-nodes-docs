# Documentation
- Class name: LoraLoaderBlockWeight
- Category: InspirePack/LoraBlockWeight
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

该节点旨在从LoRa文件中加载和操作块权重，根据指定的参数调整对不同模型层的强调，以微调输出结果。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了将要应用块权重的基础架构，显著影响最终输出。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - clip输入对于提供有助于调整块权重的上下文信息至关重要，确保输出与期望的上下文一致。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- category_filter
    - 该参数根据其类别过滤LoRa文件，允许节点专注于模型层的特定方面。
    - Comfy dtype: COMBO[lora_dirs]
    - Python dtype: str
- lora_name
    - lora_name参数在选定特定的LoRa文件，其块权重将被加载和操作中起着关键作用。
    - Comfy dtype: COMBO[lora_names]
    - Python dtype: str
- strength_model
    - 该参数调整模型块权重的影响，允许微调输出以满足特定要求。
    - Comfy dtype: FLOAT
    - Python dtype: float
- strength_clip
    - strength_clip参数修改了clip上下文信息对块权重调整的影响。
    - Comfy dtype: FLOAT
    - Python dtype: float
- inverse
    - 通过切换此参数，节点可以反转块权重的效果，提供对模型行为的替代视角。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- seed
    - seed输入初始化随机数生成器，确保块权重调整是可复现和一致的。
    - Comfy dtype: INT
    - Python dtype: int
- A
    - A参数用于定义某些向量计算的基础值，影响块权重的整体分布。
    - Comfy dtype: FLOAT
    - Python dtype: float
- B
    - 与A类似，B参数为向量计算设置了另一个基础值，有助于块权重调整的多样性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- block_vector
    - block_vector参数指定要应用的块权重序列，直接影响输出的结构和特征。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- preset
    - 预设参数提供了预定义块权重配置的选择，简化了应用常见调整的过程。
    - Comfy dtype: COMBO[preset]
    - Python dtype: str
- bypass
    - 启用时，此参数允许节点绕过块权重调整，不变地传递原始模型和clip数据。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- model
    - 输出模型已经根据加载的块权重进行了调整，反映了对架构行为的预期修改。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - 输出clip数据包含了块权重调整，确保上下文信息与修改后的模型保持一致。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- populated_vector
    - 此输出提供了应用的块权重的详细记录，作为模型修改结构的参考。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class LoraLoaderBlockWeight:

    def __init__(self):
        self.loaded_lora = None

    @classmethod
    def INPUT_TYPES(s):
        preset = ['Preset']
        preset += load_lbw_preset('lbw-preset.txt')
        preset += load_lbw_preset('lbw-preset.custom.txt')
        preset = [name for name in preset if not name.startswith('@')]
        lora_names = folder_paths.get_filename_list('loras')
        lora_dirs = [os.path.dirname(name) for name in lora_names]
        lora_dirs = ['All'] + list(set(lora_dirs))
        return {'required': {'model': ('MODEL',), 'clip': ('CLIP',), 'category_filter': (lora_dirs,), 'lora_name': (lora_names,), 'strength_model': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'strength_clip': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'inverse': ('BOOLEAN', {'default': False, 'label_on': 'True', 'label_off': 'False'}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'A': ('FLOAT', {'default': 4.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'B': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'preset': (preset,), 'block_vector': ('STRING', {'multiline': True, 'placeholder': 'block weight vectors', 'default': '1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1', 'pysssss.autocomplete': False}), 'bypass': ('BOOLEAN', {'default': False, 'label_on': 'True', 'label_off': 'False'})}}
    RETURN_TYPES = ('MODEL', 'CLIP', 'STRING')
    RETURN_NAMES = ('model', 'clip', 'populated_vector')
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/LoraBlockWeight'

    @staticmethod
    def validate(vectors):
        if len(vectors) < 12:
            return False
        for x in vectors:
            if x in ['R', 'r', 'U', 'u', 'A', 'a', 'B', 'b'] or is_numeric_string(x):
                continue
            else:
                subvectors = x.strip().split(' ')
                for y in subvectors:
                    y = y.strip()
                    if y not in ['R', 'r', 'U', 'u', 'A', 'a', 'B', 'b'] and (not is_numeric_string(y)):
                        return False
        return True

    @staticmethod
    def convert_vector_value(A, B, vector_value):

        def simple_vector(x):
            if x in ['U', 'u']:
                ratio = np.random.uniform(-1.5, 1.5)
                ratio = round(ratio, 2)
            elif x in ['R', 'r']:
                ratio = np.random.uniform(0, 3.0)
                ratio = round(ratio, 2)
            elif x == 'A':
                ratio = A
            elif x == 'a':
                ratio = A / 2
            elif x == 'B':
                ratio = B
            elif x == 'b':
                ratio = B / 2
            elif is_numeric_string(x):
                ratio = float(x)
            else:
                ratio = None
            return ratio
        v = simple_vector(vector_value)
        if v is not None:
            ratios = [v]
        else:
            ratios = [simple_vector(x) for x in vector_value.split(' ')]
        return ratios

    @staticmethod
    def norm_value(value):
        if value == 1:
            return 1
        elif value == 0:
            return 0
        else:
            return value

    @staticmethod
    def load_lora_for_models(model, clip, lora, strength_model, strength_clip, inverse, seed, A, B, block_vector):
        key_map = comfy.lora.model_lora_keys_unet(model.model)
        key_map = comfy.lora.model_lora_keys_clip(clip.cond_stage_model, key_map)
        loaded = comfy.lora.load_lora(lora, key_map)
        block_vector = block_vector.split(':')
        if len(block_vector) > 1:
            block_vector = block_vector[1]
        else:
            block_vector = block_vector[0]
        vector = block_vector.split(',')
        vector_i = 1
        if not LoraLoaderBlockWeight.validate(vector):
            preset_dict = load_preset_dict()
            if len(vector) > 0 and vector[0].strip() in preset_dict:
                vector = preset_dict[vector[0].strip()].split(',')
            else:
                raise ValueError(f"[LoraLoaderBlockWeight] invalid block_vector '{block_vector}'")
        last_k_unet_num = None
        new_modelpatcher = model.clone()
        populated_ratio = strength_model

        def parse_unet_num(s):
            if s[1] == '.':
                return int(s[0])
            else:
                return int(s)
        input_blocks = []
        middle_blocks = []
        output_blocks = []
        others = []
        for (k, v) in loaded.items():
            k_unet = k[len('diffusion_model.'):]
            if k_unet.startswith('input_blocks.'):
                k_unet_num = k_unet[len('input_blocks.'):len('input_blocks.') + 2]
                input_blocks.append((k, v, parse_unet_num(k_unet_num), k_unet))
            elif k_unet.startswith('middle_block.'):
                k_unet_num = k_unet[len('middle_block.'):len('middle_block.') + 2]
                middle_blocks.append((k, v, parse_unet_num(k_unet_num), k_unet))
            elif k_unet.startswith('output_blocks.'):
                k_unet_num = k_unet[len('output_blocks.'):len('output_blocks.') + 2]
                output_blocks.append((k, v, parse_unet_num(k_unet_num), k_unet))
            else:
                others.append((k, v, k_unet))
        input_blocks = sorted(input_blocks, key=lambda x: x[2])
        middle_blocks = sorted(middle_blocks, key=lambda x: x[2])
        output_blocks = sorted(output_blocks, key=lambda x: x[2])
        np.random.seed(seed % 2 ** 31)
        populated_vector_list = []
        ratios = []
        for (k, v, k_unet_num, k_unet) in input_blocks + middle_blocks + output_blocks:
            if last_k_unet_num != k_unet_num and len(vector) > vector_i:
                ratios = LoraLoaderBlockWeight.convert_vector_value(A, B, vector[vector_i].strip())
                ratio = ratios.pop(0)
                if inverse:
                    populated_ratio = 1 - ratio
                else:
                    populated_ratio = ratio
                populated_vector_list.append(LoraLoaderBlockWeight.norm_value(populated_ratio))
                vector_i += 1
            else:
                if len(ratios) > 0:
                    ratio = ratios.pop(0)
                if inverse:
                    populated_ratio = 1 - ratio
                else:
                    populated_ratio = ratio
            last_k_unet_num = k_unet_num
            new_modelpatcher.add_patches({k: v}, strength_model * populated_ratio)
        ratios = LoraLoaderBlockWeight.convert_vector_value(A, B, vector[0].strip())
        ratio = ratios.pop(0)
        if inverse:
            populated_ratio = 1 - ratio
        populated_vector_list.insert(0, LoraLoaderBlockWeight.norm_value(populated_ratio))
        for (k, v, k_unet) in others:
            new_modelpatcher.add_patches({k: v}, strength_model * populated_ratio)
        new_clip = clip.clone()
        new_clip.add_patches(loaded, strength_clip)
        populated_vector = ','.join(map(str, populated_vector_list))
        return (new_modelpatcher, new_clip, populated_vector)

    def doit(self, model, clip, lora_name, strength_model, strength_clip, inverse, seed, A, B, preset, block_vector, bypass=False, category_filter=None):
        if strength_model == 0 and strength_clip == 0 or bypass:
            return (model, clip, '')
        lora_path = folder_paths.get_full_path('loras', lora_name)
        lora = None
        if self.loaded_lora is not None:
            if self.loaded_lora[0] == lora_path:
                lora = self.loaded_lora[1]
            else:
                temp = self.loaded_lora
                self.loaded_lora = None
                del temp
        if lora is None:
            lora = comfy.utils.load_torch_file(lora_path, safe_load=True)
            self.loaded_lora = (lora_path, lora)
        (model_lora, clip_lora, populated_vector) = LoraLoaderBlockWeight.load_lora_for_models(model, clip, lora, strength_model, strength_clip, inverse, seed, A, B, block_vector)
        return (model_lora, clip_lora, populated_vector)
```
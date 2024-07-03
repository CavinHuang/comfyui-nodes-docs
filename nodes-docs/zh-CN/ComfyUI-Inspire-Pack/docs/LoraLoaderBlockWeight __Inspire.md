
# Documentation
- Class name: LoraLoaderBlockWeight __Inspire
- Category: InspirePack/LoraBlockWeight
- Output node: False

LoraLoaderBlockWeight节点旨在动态加载和应用LoRA（低秩适应）调整到模型和剪辑中，基于指定的参数。它通过应用由强度和其他参数决定的LoRA调整来增强或修改模型和剪辑的行为，以实现所需的效果或性能改进。

# Input types
## Required
- model
    - model参数代表将应用LoRA调整的基础模型。它对于定义适应过程的起点至关重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - clip参数表示将与基础模型一起进行LoRA调整的剪辑模型，允许在两个模型之间进行同步修改。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- category_filter
    - 可选参数，允许根据指定的类别过滤LoRA调整，实现更有针对性的适应。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: Optional[str]
- lora_name
    - 此参数指定要加载和应用的LoRA文件的名称，作为选择适当LoRA调整的关键标识符。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- strength_model
    - 定义要应用于模型的LoRA调整的强度，允许对适应的影响进行精细控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- strength_clip
    - 决定剪辑模型的LoRA调整强度，实现对适应效果的精确调节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- inverse
    - 布尔标志，设置时会反转LoRA调整效果，提供另一种适应模式。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- seed
    - seed参数用于确保LoRA调整过程的可重复性，通过一致的方式初始化随机元素。
    - Comfy dtype: INT
    - Python dtype: int
- A
    - 参数A是LoRA调整计算的一部分，有助于自定义适应效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- B
    - 参数B与A一起在LoRA调整公式中工作，进一步定制适应的结果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- preset
    - LoRA调整过程的预设配置，可能简化常见用例或所需结果的设置。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- block_vector
    - 此参数表示在LoRA调整过程中使用的向量，可能影响适应的方向和幅度。
    - Comfy dtype: STRING
    - Python dtype: str
- bypass
    - 设置为true时，完全绕过LoRA调整过程，允许原始模型不变地通过。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- model
    - 应用了LoRA调整的适应模型，反映了指定的强度和其他参数。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - 经过LoRA调整后的剪辑模型，展示了指定适应参数的效果。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- populated_vector
    - 在LoRA调整过程中填充的向量，可能包含与适应细节相关的信息。
    - Comfy dtype: STRING
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LoraLoaderBlockWeight:
    def __init__(self):
        self.loaded_lora = None

    @classmethod
    def INPUT_TYPES(s):
        preset = ["Preset"]  # 20
        preset += load_lbw_preset("lbw-preset.txt")
        preset += load_lbw_preset("lbw-preset.custom.txt")
        preset = [name for name in preset if not name.startswith('@')]

        lora_names = folder_paths.get_filename_list("loras")
        lora_dirs = [os.path.dirname(name) for name in lora_names]
        lora_dirs = ["All"] + list(set(lora_dirs))

        return {"required": {"model": ("MODEL",),
                             "clip": ("CLIP", ),
                             "category_filter": (lora_dirs,),
                             "lora_name": (lora_names, ),
                             "strength_model": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                             "strength_clip": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                             "inverse": ("BOOLEAN", {"default": False, "label_on": "True", "label_off": "False"}),
                             "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                             "A": ("FLOAT", {"default": 4.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                             "B": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                             "preset": (preset,),
                             "block_vector": ("STRING", {"multiline": True, "placeholder": "block weight vectors", "default": "1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1", "pysssss.autocomplete": False}),
                             "bypass": ("BOOLEAN", {"default": False, "label_on": "True", "label_off": "False"}),
                             }
                }

    RETURN_TYPES = ("MODEL", "CLIP", "STRING")
    RETURN_NAMES = ("model", "clip", "populated_vector")
    FUNCTION = "doit"

    CATEGORY = "InspirePack/LoraBlockWeight"

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
                    if y not in ['R', 'r', 'U', 'u', 'A', 'a', 'B', 'b'] and not is_numeric_string(y):
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
                ratio = A/2
            elif x == 'B':
                ratio = B
            elif x == 'b':
                ratio = B/2
            elif is_numeric_string(x):
                ratio = float(x)
            else:
                ratio = None

            return ratio

        v = simple_vector(vector_value)
        if v is not None:
            ratios = [v]
        else:
            ratios = [simple_vector(x) for x in vector_value.split(" ")]

        return ratios

    @staticmethod
    def norm_value(value):  # make to int if 1.0 or 0.0
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

        block_vector = block_vector.split(":")
        if len(block_vector) > 1:
            block_vector = block_vector[1]
        else:
            block_vector = block_vector[0]

        vector = block_vector.split(",")
        vector_i = 1

        if not LoraLoaderBlockWeight.validate(vector):
            preset_dict = load_preset_dict()
            if len(vector) > 0 and vector[0].strip() in preset_dict:
                vector = preset_dict[vector[0].strip()].split(",")
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

        # sort: input, middle, output, others
        input_blocks = []
        middle_blocks = []
        output_blocks = []
        others = []
        for k, v in loaded.items():
            k_unet = k[len("diffusion_model."):]

            if k_unet.startswith("input_blocks."):
                k_unet_num = k_unet[len("input_blocks."):len("input_blocks.")+2]
                input_blocks.append((k, v, parse_unet_num(k_unet_num), k_unet))
            elif k_unet.startswith("middle_block."):
                k_unet_num = k_unet[len("middle_block."):len("middle_block.")+2]
                middle_blocks.append((k, v, parse_unet_num(k_unet_num), k_unet))
            elif k_unet.startswith("output_blocks."):
                k_unet_num = k_unet[len("output_blocks."):len("output_blocks.")+2]
                output_blocks.append((k, v, parse_unet_num(k_unet_num), k_unet))
            else:
                others.append((k, v, k_unet))

        input_blocks = sorted(input_blocks, key=lambda x: x[2])
        middle_blocks = sorted(middle_blocks, key=lambda x: x[2])
        output_blocks = sorted(output_blocks, key=lambda x: x[2])

        # prepare patch
        np.random.seed(seed % (2**31))
        populated_vector_list = []
        ratios = []
        for k, v, k_unet_num, k_unet in (input_blocks + middle_blocks + output_blocks):
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
            # if inverse:
            #     print(f"\t{k_unet} -> inv({ratio}) ")
            # else:
            #     print(f"\t{k_unet} -> ({ratio}) ")

        # prepare base patch
        ratios = LoraLoaderBlockWeight.convert_vector_value(A, B, vector[0].strip())
        ratio = ratios.pop(0)

        if inverse:
            populated_ratio = 1 - ratio

        populated_vector_list.insert(0, LoraLoaderBlockWeight.norm_value(populated_ratio))

        for k, v, k_unet in others:
            new_modelpatcher.add_patches({k: v}, strength_model * populated_ratio)
            # if inverse:
            #     print(f"\t{k_unet} -> inv({ratio}) ")
            # else:
            #     print(f"\t{k_unet} -> ({ratio}) ")

        new_clip = clip.clone()
        new_clip.add_patches(loaded, strength_clip)
        populated_vector = ','.join(map(str, populated_vector_list))
        return (new_modelpatcher, new_clip, populated_vector)

    def doit(self, model, clip, lora_name, strength_model, strength_clip, inverse, seed, A, B, preset, block_vector, bypass=False, category_filter=None):
        if strength_model == 0 and strength_clip == 0 or bypass:
            return (model, clip, "")

        lora_path = folder_paths.get_full_path("loras", lora_name)
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

        model_lora, clip_lora, populated_vector = LoraLoaderBlockWeight.load_lora_for_models(model, clip, lora, strength_model, strength_clip, inverse, seed, A, B, block_vector)
        return (model_lora, clip_lora, populated_vector)

```

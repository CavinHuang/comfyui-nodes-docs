---
tags:
- LoRA
---

# Lora Loader (Block Weight)
## Documentation
- Class name: `LoraLoaderBlockWeight __Inspire`
- Category: `InspirePack/LoraBlockWeight`
- Output node: `False`

The LoraLoaderBlockWeight node is designed to dynamically load and apply LoRA (Low-Rank Adaptation) adjustments to models and clips based on specified parameters. It enhances or modifies the behavior of models and clips by applying LoRA adjustments, which are determined by the strength and other parameters provided, to achieve desired effects or performance improvements.
## Input types
### Required
- **`model`**
    - The model parameter represents the base model to which LoRA adjustments will be applied. It is crucial for defining the starting point of the adaptation process.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - The clip parameter signifies the clip model that will undergo LoRA adjustments alongside the base model, allowing for synchronized modifications across both models.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
- **`category_filter`**
    - Optional parameter that allows filtering the LoRA adjustments based on specified categories, enabling more targeted adaptations.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Optional[str]`
- **`lora_name`**
    - This parameter specifies the name of the LoRA file to be loaded and applied, serving as a key identifier for selecting the appropriate LoRA adjustments.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`strength_model`**
    - Defines the intensity of the LoRA adjustment to be applied to the model, allowing for fine-tuned control over the adaptation's impact.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`strength_clip`**
    - Determines the strength of the LoRA adjustment for the clip model, enabling precise modulation of the adaptation effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`inverse`**
    - A boolean flag that, when set, inverses the LoRA adjustment effect, offering an alternative mode of adaptation.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`seed`**
    - The seed parameter is used to ensure reproducibility in the LoRA adjustment process by initializing random elements in a consistent manner.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`A`**
    - Parameter A is part of the LoRA adjustment calculation, contributing to the customization of the adaptation effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`B`**
    - Parameter B works alongside A in the LoRA adjustment formula, further tailoring the adaptation's outcome.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`preset`**
    - A preset configuration for the LoRA adjustment process, potentially simplifying the setup for common use cases or desired outcomes.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`block_vector`**
    - This parameter represents a vector used in the LoRA adjustment process, potentially influencing the direction and magnitude of the adaptation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`bypass`**
    - When set to true, bypasses the LoRA adjustment process entirely, allowing the original models to pass through unchanged.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The adapted model with LoRA adjustments applied, reflecting the specified strength and other parameters.
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - Comfy dtype: `CLIP`
    - The clip model after undergoing LoRA adjustments, showcasing the effects of the specified adaptation parameters.
    - Python dtype: `torch.nn.Module`
- **`populated_vector`**
    - Comfy dtype: `STRING`
    - A vector populated during the LoRA adjustment process, potentially containing information relevant to the adaptation's specifics.
    - Python dtype: `torch.Tensor`
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

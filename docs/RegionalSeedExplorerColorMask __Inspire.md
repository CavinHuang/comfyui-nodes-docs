
# Documentation
- Class name: RegionalSeedExplorerColorMask __Inspire
- Category: InspirePack/Regional
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

RegionalSeedExplorerColorMask __Inspire节点专门用于探索由颜色掩码定义的特定区域内的种子变化。它根据种子提示和额外的种子信息对噪声模式进行修改，允许在生成过程中进行有针对性的调整。

# Input types
## Required
- color_mask
    - 用于定义种子探索感兴趣区域的颜色掩码。它决定了种子变化将应用的位置。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask_color
    - 掩码中用于识别应用种子变化的目标区域的特定颜色。
    - Comfy dtype: STRING
    - Python dtype: str
- noise
    - 将应用种子变化的初始噪声模式。它作为生成有针对性调整的基础。
    - Comfy dtype: NOISE
    - Python dtype: torch.Tensor
- seed_prompt
    - 一个逗号分隔的种子提示列表，用于指导在定义区域内应用的变化。
    - Comfy dtype: STRING
    - Python dtype: str
- enable_additional
    - 一个标志，指示是否应在探索过程中考虑额外的种子信息。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- additional_seed
    - 要包含在探索过程中的额外种子值，提供进一步的自定义。
    - Comfy dtype: INT
    - Python dtype: int
- additional_strength
    - 额外种子对探索过程影响的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- noise_mode
    - 指定噪声处理应该在CPU还是GPU上进行，影响性能和资源利用。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- noise
    - 应用种子变化和额外种子信息后的修改噪声模式。
    - Comfy dtype: NOISE
    - Python dtype: torch.Tensor
- mask
    - 用于定义目标区域的原始颜色掩码，返回以供参考或进一步处理。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RegionalSeedExplorerColorMask:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "color_mask": ("IMAGE",),
                "mask_color": ("STRING", {"multiline": False, "default": "#FFFFFF"}),

                "noise": ("NOISE",),
                "seed_prompt": ("STRING", {"multiline": True, "dynamicPrompts": False, "pysssss.autocomplete": False}),
                "enable_additional": ("BOOLEAN", {"default": True, "label_on": "true", "label_off": "false"}),
                "additional_seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                "additional_strength": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                "noise_mode": (["GPU(=A1111)", "CPU"],),
            },
        }

    RETURN_TYPES = ("NOISE", "MASK")
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Regional"

    def doit(self, color_mask, mask_color, noise, seed_prompt, enable_additional, additional_seed, additional_strength, noise_mode):
        device = comfy.model_management.get_torch_device()
        noise_device = "cpu" if noise_mode == "CPU" else device

        color_mask = color_mask.to(device)
        noise = noise.to(device)

        mask = color_to_mask(color_mask, mask_color)
        original_mask = mask
        mask = torch.nn.functional.interpolate(mask.reshape((-1, 1, mask.shape[-2], mask.shape[-1])), size=(noise.shape[2], noise.shape[3]), mode="bilinear").squeeze(0)

        mask = mask.to(device)

        try:
            seed_prompt = seed_prompt.replace("\n", "")
            items = seed_prompt.strip().split(",")

            if items == ['']:
                items = []

            if enable_additional:
                items.append((additional_seed, additional_strength))

            noise = prompt_support.SeedExplorer.apply_variation(noise, items, noise_device, mask)
        except Exception:
            print(f"[ERROR] IGNORED: RegionalSeedExplorerColorMask is failed.")
            traceback.print_exc()

        color_mask.cpu()
        noise = noise.cpu()
        original_mask = original_mask.cpu()
        return (noise, original_mask)

```

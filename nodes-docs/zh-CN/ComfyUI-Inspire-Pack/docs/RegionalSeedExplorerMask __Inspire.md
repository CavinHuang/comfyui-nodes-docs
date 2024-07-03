
# Documentation
- Class name: RegionalSeedExplorerMask __Inspire
- Category: InspirePack/Regional
- Output node: False

RegionalSeedExplorerMask节点旨在根据种子提示和掩码对噪声模式进行变化，从而在指定区域内探索多样化的视觉效果。它利用掩码来聚焦变化，实现图像生成过程中的定向修改和增强。

# Input types
## Required
- mask
    - mask参数指定了噪声模式中应用种子提示变化的区域，实现定向修改。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- noise
    - noise参数代表初始噪声模式，是应用种子提示变化的基础，用于生成多样化的视觉效果。
    - Comfy dtype: NOISE
    - Python dtype: torch.Tensor
- seed_prompt
    - seed_prompt参数包含了定义噪声模式变化的种子提示，引导生成特定的视觉效果。
    - Comfy dtype: STRING
    - Python dtype: str
- enable_additional
    - 该参数控制是否在变化过程中包含额外的种子提示及其对应强度，允许进行更复杂的修改。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- additional_seed
    - 当启用额外修改时，此参数指定要应用的额外种子提示。
    - Comfy dtype: INT
    - Python dtype: str
- additional_strength
    - 该参数决定了额外种子提示对噪声模式的影响强度，允许进行精细调整。
    - Comfy dtype: FLOAT
    - Python dtype: float
- noise_mode
    - noise_mode参数指定处理应在CPU还是GPU上进行，影响性能和资源利用。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- noise
    - 修改后的噪声模式，反映了在指定掩码区域内应用的种子提示变化。
    - Comfy dtype: NOISE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RegionalSeedExplorerMask:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "mask": ("MASK",),

                "noise": ("NOISE",),
                "seed_prompt": ("STRING", {"multiline": True, "dynamicPrompts": False, "pysssss.autocomplete": False}),
                "enable_additional": ("BOOLEAN", {"default": True, "label_on": "true", "label_off": "false"}),
                "additional_seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                "additional_strength": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                "noise_mode": (["GPU(=A1111)", "CPU"],),
            },
        }

    RETURN_TYPES = ("NOISE",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Regional"

    def doit(self, mask, noise, seed_prompt, enable_additional, additional_seed, additional_strength, noise_mode):
        device = comfy.model_management.get_torch_device()
        noise_device = "cpu" if noise_mode == "CPU" else device

        noise = noise.to(device)
        mask = mask.to(device)

        if len(mask.shape) == 2:
            mask = mask.unsqueeze(0)

        mask = torch.nn.functional.interpolate(mask.reshape((-1, 1, mask.shape[-2], mask.shape[-1])), size=(noise.shape[2], noise.shape[3]), mode="bilinear").squeeze(0)

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

        noise = noise.cpu()
        mask.cpu()
        return (noise,)

```

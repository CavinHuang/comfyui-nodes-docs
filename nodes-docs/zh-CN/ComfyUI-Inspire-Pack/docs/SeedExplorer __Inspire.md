
# Documentation
- Class name: SeedExplorer __Inspire
- Category: InspirePack/Prompt
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SeedExplorer __Inspire节点旨在生成过程中方便种子值的探索和管理。它能动态调整和应用种子值来影响生成过程，提供了一种探索变化并确保生成输出一致性的方法。该节点通过操作种子值来增强生成结果的可控性和多样性，是创意工作流中的重要工具。

# Input types
## Required
- latent
    - 表示节点将使用提供的种子值操作的初始潜在空间或图像数据。它作为种子探索过程的起点，为后续变化奠定基础。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- seed_prompt
    - 包含种子值和可能的其他指令的字符串输入，用于生成变化。它通过指定种子值及其预期效果来指导生成过程，为创作提供更精确的控制。
    - Comfy dtype: STRING
    - Python dtype: str
- enable_additional
    - 布尔标志，用于启用或禁用额外种子和强度参数的应用，以进一步操纵生成过程。这为用户提供了更细粒度的控制选项。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- additional_seed
    - 表示与主种子提示一起应用的额外种子值的整数。它为生成结果提供了更精细的控制，增加了输出的多样性。
    - Comfy dtype: INT
    - Python dtype: int
- additional_strength
    - 指定额外种子对生成过程影响强度的浮点值。它允许微调额外种子的影响，为创作提供更精确的调节能力。
    - Comfy dtype: FLOAT
    - Python dtype: float
- noise_mode
    - 指定噪声生成应该在GPU还是CPU上进行，影响生成过程的性能和效率。这为不同硬件配置的用户提供了灵活性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- initial_batch_seed_mode
    - 决定初始批次的种子应用模式，影响多次生成过程中种子的应用和变化方式。这有助于在批量生成中实现所需的一致性或变化性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- noise
    - 应用种子值和额外参数后产生的经过处理的噪声张量。它代表了种子探索过程的直接输出，为后续的图像生成或处理提供基础。
    - Comfy dtype: NOISE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeedExplorer:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "latent": ("LATENT",),
                "seed_prompt": ("STRING", {"multiline": True, "dynamicPrompts": False, "pysssss.autocomplete": False}),
                "enable_additional": ("BOOLEAN", {"default": True, "label_on": "true", "label_off": "false"}),
                "additional_seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                "additional_strength": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                "noise_mode": (["GPU(=A1111)", "CPU"],),
                "initial_batch_seed_mode": (["incremental", "comfy"],),
            }
        }

    RETURN_TYPES = ("NOISE",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Prompt"

    @staticmethod
    def apply_variation(start_noise, seed_items, noise_device, mask=None):
        noise = start_noise
        for x in seed_items:
            if isinstance(x, str):
                item = x.split(':')
            else:
                item = x

            if len(item) == 2:
                try:
                    variation_seed = int(item[0])
                    variation_strength = float(item[1])

                    noise = utils.apply_variation_noise(noise, noise_device, variation_seed, variation_strength, mask=mask)
                except Exception:
                    print(f"[ERROR] IGNORED: SeedExplorer failed to processing '{x}'")
                    traceback.print_exc()
        return noise

    def doit(self, latent, seed_prompt, enable_additional, additional_seed, additional_strength, noise_mode,
             initial_batch_seed_mode):
        latent_image = latent["samples"]
        device = comfy.model_management.get_torch_device()
        noise_device = "cpu" if noise_mode == "CPU" else device

        seed_prompt = seed_prompt.replace("\n", "")
        items = seed_prompt.strip().split(",")

        if items == ['']:
            items = []

        if enable_additional:
            items.append((additional_seed, additional_strength))

        try:
            hd = items[0]
            tl = items[1:]

            if isinstance(hd, tuple):
                hd_seed = int(hd[0])
            else:
                hd_seed = int(hd)

            noise = utils.prepare_noise(latent_image, hd_seed, None, noise_device, initial_batch_seed_mode)
            noise = noise.to(device)
            noise = SeedExplorer.apply_variation(noise, tl, noise_device)
            noise = noise.cpu()

            return (noise,)

        except Exception:
            print(f"[ERROR] IGNORED: SeedExplorer failed")
            traceback.print_exc()

        noise = torch.zeros(latent_image.size(), dtype=latent_image.dtype, layout=latent_image.layout,
                            device=noise_device)
        return (noise,)

```

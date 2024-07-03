
# Documentation
- Class name: FL_Glitch
- Category: 🏵️Fill Nodes
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Flowty_CRM

FL_Glitch节点应用数字故障效果到图像上，可选择性地包含颜色偏移，并通过种子控制以实现可重复性。它处理一批图像，应用一种以风格化方式扭曲视觉内容的故障效果，并在处理过程中提供进度更新。

# Input types
## Required
- images
    - images参数是一组将应用故障效果的图像。它对于定义将经历故障转换过程的输入数据至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
## Optional
- glitch_amount
    - glitch_amount参数控制应用于图像的故障效果的强度。它在决定视觉扭曲的程度方面起着关键作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- color_offset
    - color_offset参数启用或禁用故障效果中的颜色偏移，增加了一层额外的视觉操作。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- seed
    - seed参数确保应用于图像的故障效果的可重复性，允许在不同运行中获得一致的结果。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是一个经过处理以包含数字故障效果的图像张量，根据输入参数可能包含颜色偏移。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class FL_Glitch:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
            },
            "optional": {
                "glitch_amount": ("FLOAT", {"default": 3.0, "min": 0.1, "max": 10.0, "step": 0.01}),
                "color_offset": (["Disable", "Enable"],),
                "seed": ("INT", {"default": 0, "min": 0, "max": 100, "step": 1}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "glitch"
    CATEGORY = "🏵️Fill Nodes"

    def t2p(self, t):
        if t is not None:
            i = 255.0 * t.cpu().numpy().squeeze()
            p = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8))
        return p

    def s2b(self, v):
        return v == "Enable"

    def glitch(self, images, glitch_amount=1, color_offset="Disable", seed=0):
        color_offset = self.s2b(color_offset)
        g = ImageGlitcher()
        out = []
        total_images = len(images)
        for i, image in enumerate(images, start=1):
            p = self.t2p(image)

            g1 = g.glitch_image(p, glitch_amount, color_offset=color_offset, seed=seed)

            r1 = g1.rotate(90, expand=True)

            g2 = g.glitch_image(r1, glitch_amount, color_offset=color_offset, seed=seed)

            f = g2.rotate(-90, expand=True)

            o = np.array(f.convert("RGB")).astype(np.float32) / 255.0
            o = torch.from_numpy(o).unsqueeze(0)
            out.append(o)

            # Print progress update
            progress = i / total_images * 100
            sys.stdout.write(f"\rProcessing images: {progress:.2f}%")
            sys.stdout.flush()

        # Print a new line after the progress update
        print()

        out = torch.cat(out, 0)
        return (out,)

```

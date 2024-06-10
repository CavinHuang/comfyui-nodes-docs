---
tags:
- AnimationScheduling
- VisualEffects
---

# FL Glitch
## Documentation
- Class name: `FL_Glitch`
- Category: `🏵️Fill Nodes`
- Output node: `False`

The FL_Glitch node applies a digital glitch effect to images, optionally incorporating color offsets and controlled by a seed for reproducibility. It processes a batch of images, applying a glitch effect that distorts the visual content in a stylistic manner, and provides progress updates during processing.
## Input types
### Required
- **`images`**
    - The 'images' parameter is a collection of images to which the glitch effect will be applied. It is essential for defining the input data that will undergo the glitch transformation process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
### Optional
- **`glitch_amount`**
    - The 'glitch_amount' parameter controls the intensity of the glitch effect applied to the images. It plays a crucial role in determining the extent of visual distortion.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`color_offset`**
    - The 'color_offset' parameter enables or disables color offsetting in the glitch effect, adding an additional layer of visual manipulation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`seed`**
    - The 'seed' parameter ensures the reproducibility of the glitch effects applied to the images, allowing for consistent results across different runs.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a tensor of images that have been processed to include a digital glitch effect, potentially with color offsets, depending on the input parameters.
    - Python dtype: `torch.Tensor`
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

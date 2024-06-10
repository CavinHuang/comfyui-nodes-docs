---
tags:
- AnimationScheduling
- VisualEffects
---

# FL Ripple
## Documentation
- Class name: `FL_Ripple`
- Category: `🏵️Fill Nodes`
- Output node: `False`

The FL_Ripple node applies a ripple effect to a collection of images, transforming each image by simulating a ripple pattern. This effect is achieved through mathematical manipulation of the image pixels, based on specified parameters such as amplitude, frequency, and phase, to create visually dynamic results.
## Input types
### Required
- **`images`**
    - A collection of images to which the ripple effect will be applied. This parameter is essential for determining the input images that will undergo the transformation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
### Optional
- **`amplitude`**
    - Defines the height of the ripple waves. A higher amplitude results in more pronounced ripples.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`frequency`**
    - Determines the number of ripples in the image. Higher frequencies result in more ripples within a given space.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`phase`**
    - Adjusts the starting point of the ripple effect, allowing for phase shifts in the wave pattern.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image with the ripple effect applied, represented as a tensor.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class FL_Ripple:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
            },
            "optional": {
                "amplitude": ("FLOAT", {"default": 10.0, "min": 0.1, "max": 50.0, "step": 0.1}),
                "frequency": ("FLOAT", {"default": 20.0, "min": 1.0, "max": 100.0, "step": 0.1}),
                "phase": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 360.0, "step": 1.0}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "ripple"
    CATEGORY = "🏵️Fill Nodes"

    def t2p(self, t):
        if t is not None:
            i = 255.0 * t.cpu().numpy().squeeze()
            p = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8))
        return p

    def ripple(self, images, amplitude=10.0, frequency=20.0, phase=0.0):
        out = []
        total_images = len(images)
        for i, img in enumerate(images, start=1):
            p = self.t2p(img)
            width, height = p.size
            center_x = width // 2
            center_y = height // 2

            x, y = np.meshgrid(np.arange(width), np.arange(height))
            dx = x - center_x
            dy = y - center_y
            distance = np.sqrt(dx ** 2 + dy ** 2)

            angle = distance / frequency * 2 * np.pi + np.radians(phase)
            offset_x = (amplitude * np.sin(angle)).astype(int)
            offset_y = (amplitude * np.cos(angle)).astype(int)

            sample_x = np.clip(x + offset_x, 0, width - 1)
            sample_y = np.clip(y + offset_y, 0, height - 1)

            p_array = np.array(p)
            rippled_array = p_array[sample_y, sample_x]

            o = rippled_array.astype(np.float32) / 255.0
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

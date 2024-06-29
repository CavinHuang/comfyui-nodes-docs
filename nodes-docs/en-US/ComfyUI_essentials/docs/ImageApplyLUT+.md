---
tags:
- Color
---

# 🔧 Image Apply LUT
## Documentation
- Class name: `ImageApplyLUT+`
- Category: `essentials`
- Output node: `False`

The ImageApplyLUT+ node applies a Look-Up Table (LUT) to an image or a batch of images to adjust their colors, optionally applying color space transformations and blending the original images with their LUT-applied versions based on a specified strength. This process can enhance or stylize images by altering their color profiles.
## Input types
### Required
- **`image`**
    - The image or batch of images to which the LUT will be applied. This input is crucial for defining the visual content that will undergo color transformation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`lut_file`**
    - The filename of the Look-Up Table (LUT) to be applied. This determines the specific color transformation that will be executed on the input images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_colorspace`**
    - A boolean flag indicating whether to apply a logarithmic color space transformation to the images before and after applying the LUT, enhancing the effect of the LUT under certain conditions.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`clip_values`**
    - A boolean flag that specifies whether to clip the color values of the images to fit within the LUT's domain, ensuring that the output colors are valid within the specified color space.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`strength`**
    - A floating-point value that determines the blend strength between the original images and their LUT-applied versions, allowing for subtle to significant alterations in the image's appearance.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The transformed images after applying the LUT, optional color space transformation, and blending based on the specified strength. This output showcases the final stylized or color-corrected images.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageApplyLUT:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "lut_file": ([f for f in os.listdir(LUTS_DIR) if f.endswith('.cube')], ),
                "log_colorspace": ("BOOLEAN", { "default": False }),
                "clip_values": ("BOOLEAN", { "default": False }),
                "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.1 }),
            }}

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"
    CATEGORY = "essentials"

    # TODO: check if we can do without numpy
    def execute(self, image, lut_file, log_colorspace, clip_values, strength):
        from colour.io.luts.iridas_cube import read_LUT_IridasCube

        lut = read_LUT_IridasCube(os.path.join(LUTS_DIR, lut_file))
        lut.name = lut_file

        if clip_values:
            if lut.domain[0].max() == lut.domain[0].min() and lut.domain[1].max() == lut.domain[1].min():
                lut.table = np.clip(lut.table, lut.domain[0, 0], lut.domain[1, 0])
            else:
                if len(lut.table.shape) == 2:  # 3x1D
                    for dim in range(3):
                        lut.table[:, dim] = np.clip(lut.table[:, dim], lut.domain[0, dim], lut.domain[1, dim])
                else:  # 3D
                    for dim in range(3):
                        lut.table[:, :, :, dim] = np.clip(lut.table[:, :, :, dim], lut.domain[0, dim], lut.domain[1, dim])

        out = []
        for img in image: # TODO: is this more resource efficient? should we use a batch instead?
            lut_img = img.numpy().copy()

            is_non_default_domain = not np.array_equal(lut.domain, np.array([[0., 0., 0.], [1., 1., 1.]]))
            dom_scale = None
            if is_non_default_domain:
                dom_scale = lut.domain[1] - lut.domain[0]
                lut_img = lut_img * dom_scale + lut.domain[0]
            if log_colorspace:
                lut_img = lut_img ** (1/2.2)
            lut_img = lut.apply(lut_img)
            if log_colorspace:
                lut_img = lut_img ** (2.2)
            if is_non_default_domain:
                lut_img = (lut_img - lut.domain[0]) / dom_scale

            lut_img = torch.from_numpy(lut_img)
            if strength < 1.0:
                lut_img = strength * lut_img + (1 - strength) * img
            out.append(lut_img)

        out = torch.stack(out)

        return (out, )

```

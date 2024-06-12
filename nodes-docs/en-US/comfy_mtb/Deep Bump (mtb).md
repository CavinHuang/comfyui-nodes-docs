---
tags:
- DepthMap
- DepthMapEstimation
- Image
- NormalMap
---

# Deep Bump (mtb)
## Documentation
- Class name: `Deep Bump (mtb)`
- Category: `mtb/textures`
- Output node: `False`

The Deep Bump node is designed for generating normal and height maps from single images, offering a versatile approach to texture processing by converting color images to normal maps, normal maps to curvature maps, or normal maps to height maps, depending on the selected mode. It utilizes advanced image processing techniques to achieve detailed and accurate representations of surface textures.
## Input types
### Required
- **`image`**
    - The input image for which the normal or height map will be generated. It serves as the foundational data from which the node derives texture maps.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mode`**
    - Specifies the operation mode of the node, which can be converting color images to normal maps, normal maps to curvature maps, or normal maps to height maps, affecting the type of texture map produced.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`color_to_normals_overlap`**
    - Determines the overlap size when converting color images to normal maps, influencing the smoothness and continuity of the generated normal map.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`normals_to_curvature_blur_radius`**
    - Specifies the blur radius when converting normal maps to curvature maps, affecting the level of detail and smoothness in the curvature map.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`normals_to_height_seamless`**
    - A boolean indicating whether the conversion from normal maps to height maps should be seamless, impacting the continuity and uniformity of the height map.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is either a normal map, curvature map, or height map based on the selected mode, representing the processed texture of the input image.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MTB_DeepBump:
    """Normal & height maps generation from single pictures"""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "mode": (
                    [
                        "Color to Normals",
                        "Normals to Curvature",
                        "Normals to Height",
                    ],
                ),
                "color_to_normals_overlap": (["SMALL", "MEDIUM", "LARGE"],),
                "normals_to_curvature_blur_radius": (
                    [
                        "SMALLEST",
                        "SMALLER",
                        "SMALL",
                        "MEDIUM",
                        "LARGE",
                        "LARGER",
                        "LARGEST",
                    ],
                ),
                "normals_to_height_seamless": ("BOOLEAN", {"default": True}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "apply"

    CATEGORY = "mtb/textures"

    def apply(
        self,
        *,
        image,
        mode="Color to Normals",
        color_to_normals_overlap="SMALL",
        normals_to_curvature_blur_radius="SMALL",
        normals_to_height_seamless=True,
    ):
        images = tensor2pil(image)
        out_images = []

        for image in images:
            log.debug(f"Input image shape: {image}")

            in_img = np.transpose(image, (2, 0, 1)) / 255
            log.debug(f"transposed for deep image shape: {in_img.shape}")
            out_img = None

            # Apply processing
            if mode == "Color to Normals":
                out_img = color_to_normals(
                    in_img, color_to_normals_overlap, None
                )
            if mode == "Normals to Curvature":
                out_img = normals_to_curvature(
                    in_img, normals_to_curvature_blur_radius, None
                )
            if mode == "Normals to Height":
                out_img = normals_to_height(
                    in_img, normals_to_height_seamless, None
                )

            if out_img is not None:
                log.debug(f"Output image shape: {out_img.shape}")
                out_images.append(
                    torch.from_numpy(
                        np.transpose(out_img, (1, 2, 0)).astype(np.float32)
                    ).unsqueeze(0)
                )
            else:
                log.error("No out img... This should not happen")
        for outi in out_images:
            log.debug(f"Shape fed to utils: {outi.shape}")
        return (torch.cat(out_images, dim=0),)

```

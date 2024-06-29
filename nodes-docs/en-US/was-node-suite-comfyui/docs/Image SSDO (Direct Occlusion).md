---
tags:
- VisualEffects
---

# Image SSDO (Direct Occlusion)
## Documentation
- Class name: `Image SSDO (Direct Occlusion)`
- Category: `WAS Suite/Image/Filter`
- Output node: `False`

This node is designed to simulate the effect of direct occlusion in images, enhancing the realism of 3D scenes by calculating how objects block light sources. It processes a set of images along with their depth information to generate occlusion effects, which can be adjusted for strength, radius, and specular highlights, optionally incorporating colored occlusion for added visual depth.
## Input types
### Required
- **`images`**
    - A collection of images on which to perform direct occlusion. These images serve as the base for calculating how light interacts with objects, directly affecting the visual outcome of the occlusion effect.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`depth_images`**
    - Corresponding depth information for each image, used to determine the spatial relationships between objects in the scene. This depth data is crucial for accurately simulating how objects block or allow light to pass, influencing the occlusion effect.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`strength`**
    - Controls the intensity of the occlusion effect, allowing for fine-tuning of how pronounced the occlusion appears in the final image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`radius`**
    - Determines the size of the area around objects affected by occlusion, impacting the softness and spread of shadows.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`specular_threshold`**
    - Sets the threshold for specular highlights, enabling the simulation of shiny surfaces where light is more likely to reflect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`colored_occlusion`**
    - When enabled, applies color to the occlusion effect, adding a layer of visual complexity and realism to the scene.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
## Output types
- **`composited_images`**
    - Comfy dtype: `IMAGE`
    - The final images with direct occlusion applied, showcasing enhanced depth and realism through the simulation of light blocking effects.
    - Python dtype: `torch.Tensor`
- **`ssdo_images`**
    - Comfy dtype: `IMAGE`
    - The calculated occlusion effects for each image, which can be used for further analysis or processing.
    - Python dtype: `torch.Tensor`
- **`ssdo_image_masks`**
    - Comfy dtype: `IMAGE`
    - Masks indicating the areas of each image affected by occlusion, useful for understanding the spatial distribution of the effect.
    - Python dtype: `torch.Tensor`
- **`light_source_image_masks`**
    - Comfy dtype: `IMAGE`
    - Identified light sources in the images, which are crucial for accurately simulating the occlusion effect.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Direct_Occlusion:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "depth_images": ("IMAGE",),
                "strength": ("FLOAT", {"min": 0.0, "max": 5.0, "default": 1.0, "step": 0.01}),
                "radius": ("FLOAT", {"min": 0.01, "max": 1024, "default": 30, "step": 0.01}),
                "specular_threshold": ("INT", {"min":0, "max": 255, "default": 128, "step": 1}),
                "colored_occlusion": (["True", "False"],),
            },
        }

    RETURN_TYPES = ("IMAGE","IMAGE","IMAGE", "IMAGE")
    RETURN_NAMES = ("composited_images", "ssdo_images", "ssdo_image_masks", "light_source_image_masks")
    FUNCTION = "direct_occlusion"

    CATEGORY = "WAS Suite/Image/Filter"

    def direct_occlusion(self, images, depth_images, strength, radius, specular_threshold, colored_occlusion):

        composited = []
        occlusions = []
        occlusion_masks = []
        light_sources = []
        for i, image in enumerate(images):
            cstr(f"Processing SSDO image {i+1}/{len(images)} ...").msg.print()
            composited_image, occlusion_image, occlusion_mask, light_source = self.create_direct_occlusion(
                tensor2pil(image),
                tensor2pil(depth_images[(i if len(depth_images) >= i else -1)]),
                strength=strength,
                radius=radius,
                threshold=specular_threshold,
                colored=True
            )
            composited.append(pil2tensor(composited_image))
            occlusions.append(pil2tensor(occlusion_image))
            occlusion_masks.append(pil2tensor(occlusion_mask))
            light_sources.append(pil2tensor(light_source))

        composited = torch.cat(composited, dim=0)
        occlusions = torch.cat(occlusions, dim=0)
        occlusion_masks = torch.cat(occlusion_masks, dim=0)
        light_sources = torch.cat(light_sources, dim=0)

        return ( composited, occlusions, occlusion_masks, light_sources )

    def find_light_source(self, rgb_normalized, threshold):
        from skimage.measure import regionprops
        from skimage import measure
        rgb_uint8 = (rgb_normalized * 255).astype(np.uint8)
        rgb_to_grey = Image.fromarray(rgb_uint8, mode="RGB")
        dominant = self.dominant_region(rgb_to_grey, threshold)
        grayscale_image = np.array(dominant.convert("L"), dtype=np.float32) / 255.0
        regions = measure.label(grayscale_image > 0)

        if np.max(regions) > 0:
            region_sums = measure.regionprops(regions, intensity_image=grayscale_image)
            brightest_region = max(region_sums, key=lambda r: r.mean_intensity)
            light_y, light_x = brightest_region.centroid
            light_mask = (regions == brightest_region.label).astype(np.uint8)
            light_mask_cluster = light_mask
        else:
            light_x, light_y = np.nan, np.nan
            light_mask_cluster = np.zeros_like(dominant, dtype=np.uint8)
        return light_mask_cluster, light_x, light_y


    def dominant_region(self, image, threshold=128):
        from scipy.ndimage import label
        image = ImageOps.invert(image.convert("L"))
        binary_image = image.point(lambda x: 255 if x > threshold else 0, mode="1")
        l, n = label(np.array(binary_image))
        sizes = np.bincount(l.flatten())
        dominant = 0
        try:
            dominant = np.argmax(sizes[1:]) + 1
        except ValueError:
            pass
        dominant_region_mask = (l == dominant).astype(np.uint8) * 255
        result = Image.fromarray(dominant_region_mask, mode="L")
        return result.convert("RGB")

    def create_direct_occlusion(self, rgb_image, depth_image, strength=1.0, radius=10, threshold=200, colored=False):
        rgb_normalized = np.array(rgb_image, dtype=np.float32) / 255.0
        depth_normalized = np.array(depth_image, dtype=np.float32) / 255.0
        height, width, _ = rgb_normalized.shape
        light_mask, light_x, light_y = self.find_light_source(rgb_normalized, threshold)
        occlusion_array = calculate_direct_occlusion_factor(rgb_normalized, depth_normalized, height, width, radius)
        #occlusion_scaled = (occlusion_array / np.max(occlusion_array) * 255).astype(np.uint8)
        occlusion_scaled = ((occlusion_array - np.min(occlusion_array)) / (np.max(occlusion_array) - np.min(occlusion_array)) * 255).astype(np.uint8)
        occlusion_image = Image.fromarray(occlusion_scaled, mode="L")
        occlusion_image = occlusion_image.filter(ImageFilter.GaussianBlur(radius=0.5))
        occlusion_image = occlusion_image.filter(ImageFilter.SMOOTH_MORE)

        if colored:
            occlusion_result = Image.composite(
                Image.new("RGB", rgb_image.size, (0, 0, 0)),
                rgb_image,
                occlusion_image
            )
            occlusion_result = ImageOps.autocontrast(occlusion_result, cutoff=(0, strength))
        else:
            occlusion_result = Image.blend(occlusion_image, occlusion_image, strength)

        light_image = ImageOps.invert(Image.fromarray(light_mask * 255, mode="L"))

        direct_occlusion_image = ImageChops.screen(rgb_image, occlusion_result.convert("RGB"))

        return direct_occlusion_image, occlusion_result, occlusion_image, light_image

```

---
tags:
- VisualEffects
---

# Image SSAO (Ambient Occlusion)
## Documentation
- Class name: `Image SSAO (Ambient Occlusion)`
- Category: `WAS Suite/Image/Filter`
- Output node: `False`

This node specializes in enhancing the realism of images by simulating the way light interacts with objects in a scene, particularly in areas where objects block ambient light, creating soft shadows known as ambient occlusion. It processes images and depth information to add depth and dimensionality, improving visual quality and realism.
## Input types
### Required
- **`images`**
    - A collection of images to be processed for ambient occlusion effects. These images serve as the base for the occlusion calculations, determining where shadows and highlights are added to enhance depth and realism.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`depth_images`**
    - Corresponding depth images for each image in the 'images' list. These depth maps are crucial for calculating how light interacts with the objects in the scene, influencing the generation of ambient occlusion effects.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`strength`**
    - Controls the intensity of the ambient occlusion effect. Higher values result in more pronounced shadows, adding greater depth and contrast to the scene.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`radius`**
    - Determines the spread of the ambient occlusion effect. A larger radius simulates a softer, more diffuse shadow, contributing to a more natural and realistic appearance.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`ao_blur`**
    - Applies a Gaussian blur to the ambient occlusion effect, softening the shadows and blending them more seamlessly into the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`specular_threshold`**
    - Sets the threshold for specular highlights. This parameter helps in distinguishing between surfaces that are directly lit and those that are not, affecting the application of ambient occlusion.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`enable_specular_masking`**
    - A boolean flag that, when enabled, applies a mask to the specular highlights, preventing ambient occlusion from affecting highly reflective surfaces. This adds to the realism by ensuring that shiny surfaces retain their characteristic brightness.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`tile_size`**
    - Determines the processing mode based on its value, affecting the quality and speed of the ambient occlusion effect generation. Smaller values lead to higher quality but slower processing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`composited_images`**
    - Comfy dtype: `IMAGE`
    - The final images with the ambient occlusion effect applied, showcasing enhanced depth and realism.
    - Python dtype: `torch.Tensor`
- **`ssao_images`**
    - Comfy dtype: `IMAGE`
    - The generated ambient occlusion maps, indicating where shadows have been added to the scene.
    - Python dtype: `torch.Tensor`
- **`specular_mask_images`**
    - Comfy dtype: `IMAGE`
    - Specular masks generated during the process, used to preserve the brightness of reflective surfaces by excluding them from the ambient occlusion effect.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Ambient_Occlusion:
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
                "ao_blur": ("FLOAT", {"min": 0.01, "max": 1024, "default": 2.5, "step": 0.01}),
                "specular_threshold": ("INT", {"min":0, "max": 255, "default": 25, "step": 1}),
                "enable_specular_masking": (["True", "False"],),
                "tile_size": ("INT", {"min": 1, "max": 512, "default": 1, "step": 1}),
            },
        }

    RETURN_TYPES = ("IMAGE","IMAGE","IMAGE")
    RETURN_NAMES = ("composited_images", "ssao_images", "specular_mask_images")
    FUNCTION = "ambient_occlusion"

    CATEGORY = "WAS Suite/Image/Filter"

    def ambient_occlusion(self, images, depth_images, strength, radius, ao_blur, specular_threshold, enable_specular_masking, tile_size):

        enable_specular_masking = (enable_specular_masking == 'True')
        composited = []
        occlusions = []
        speculars = []
        for i, image in enumerate(images):
            cstr(f"Processing SSAO image {i+1}/{len(images)} ...").msg.print()
            composited_image, occlusion_image, specular_mask = self.create_ambient_occlusion(
                tensor2pil(image),
                tensor2pil(depth_images[(i if len(depth_images) >= i else -1)]),
                strength=strength,
                radius=radius,
                ao_blur=ao_blur,
                spec_threshold=specular_threshold,
                enable_specular_masking=enable_specular_masking,
                tile_size=tile_size
            )
            composited.append(pil2tensor(composited_image))
            occlusions.append(pil2tensor(occlusion_image))
            speculars.append(pil2tensor(specular_mask))

        composited = torch.cat(composited, dim=0)
        occlusions = torch.cat(occlusions, dim=0)
        speculars = torch.cat(speculars, dim=0)

        return ( composited, occlusions, speculars )

    def process_tile(self, tile_rgb, tile_depth, tile_x, tile_y, radius):
        tile_occlusion = calculate_ambient_occlusion_factor(tile_rgb, tile_depth, tile_rgb.shape[0], tile_rgb.shape[1], radius)
        return tile_x, tile_y, tile_occlusion


    def create_ambient_occlusion(self, rgb_image, depth_image, strength=1.0, radius=30, ao_blur=5, spec_threshold=200, enable_specular_masking=False, tile_size=1):

        import concurrent.futures

        if depth_image.size != rgb_image.size:
            depth_image = depth_image.resize(rgb_image.size)
        rgb_normalized = np.array(rgb_image, dtype=np.float32) / 255.0
        depth_normalized = np.array(depth_image, dtype=np.float32) / 255.0

        height, width, _ = rgb_normalized.shape

        if tile_size <= 1:
            print("Processing single-threaded AO (highest quality) ...")
            occlusion_array = calculate_ambient_occlusion_factor(rgb_normalized, depth_normalized, height, width, radius)
        else:
            tile_size = ((tile_size if tile_size <= 8 else 8) if tile_size > 1 else 1)
            num_tiles_x = (width - 1) // tile_size + 1
            num_tiles_y = (height - 1) // tile_size + 1

            occlusion_array = np.zeros((height, width), dtype=np.uint8)

            with concurrent.futures.ThreadPoolExecutor() as executor:
                futures = []

                with tqdm(total=num_tiles_y * num_tiles_x) as pbar:
                    for tile_y in range(num_tiles_y):
                        for tile_x in range(num_tiles_x):
                            tile_left = tile_x * tile_size
                            tile_upper = tile_y * tile_size
                            tile_right = min(tile_left + tile_size, width)
                            tile_lower = min(tile_upper + tile_size, height)

                            tile_rgb = rgb_normalized[tile_upper:tile_lower, tile_left:tile_right]
                            tile_depth = depth_normalized[tile_upper:tile_lower, tile_left:tile_right]

                            future = executor.submit(self.process_tile, tile_rgb, tile_depth, tile_x, tile_y, radius)
                            futures.append(future)

                    for future in concurrent.futures.as_completed(futures):
                        tile_x, tile_y, tile_occlusion = future.result()
                        tile_left = tile_x * tile_size
                        tile_upper = tile_y * tile_size
                        tile_right = min(tile_left + tile_size, width)
                        tile_lower = min(tile_upper + tile_size, height)

                        occlusion_array[tile_upper:tile_lower, tile_left:tile_right] = tile_occlusion

                        pbar.update(1)

        occlusion_array = (occlusion_array * strength).clip(0, 255).astype(np.uint8)

        occlusion_image = Image.fromarray(occlusion_array, mode='L')
        occlusion_image = occlusion_image.filter(ImageFilter.GaussianBlur(radius=ao_blur))
        occlusion_image = occlusion_image.filter(ImageFilter.SMOOTH)
        occlusion_image = ImageChops.multiply(occlusion_image, ImageChops.multiply(occlusion_image, occlusion_image))

        mask = rgb_image.convert('L')
        mask = mask.point(lambda x: x > spec_threshold, mode='1')
        mask = mask.convert("RGB")
        mask = mask.filter(ImageFilter.GaussianBlur(radius=2.5)).convert("L")

        if enable_specular_masking:
            occlusion_image = Image.composite(Image.new("L", rgb_image.size, 255), occlusion_image, mask)
        occlsuion_result = ImageChops.multiply(rgb_image, occlusion_image.convert("RGB"))

        return occlsuion_result, occlusion_image, mask

```

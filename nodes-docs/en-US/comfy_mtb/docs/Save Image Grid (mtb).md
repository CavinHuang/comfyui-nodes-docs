---
tags:
- GridLayout
- Image
- Tiled
---

# Save Image Grid (mtb)
## Documentation
- Class name: `Save Image Grid (mtb)`
- Category: `mtb/IO`
- Output node: `True`

The Save Image Grid node is designed to compile a collection of images into a single, cohesive grid layout. This functionality is particularly useful for visualizing multiple images in a structured format, allowing for easier comparison and analysis of visual data.
## Input types
### Required
- **`images`**
    - A batch of images to be compiled into a grid. This collection is essential for determining the composition and overall appearance of the final image grid.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[PIL.Image]`
- **`filename_prefix`**
    - A prefix for the filename under which the grid image will be saved. This parameter allows for customizable naming of the output file, aiding in organization and retrieval.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`save_intermediate`**
    - A boolean flag indicating whether intermediate images should be saved during the grid compilation process. This option provides flexibility in saving individual images before they are combined into the final grid.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_SaveImageGrid:
    """Save all the images in the input batch as a grid of images."""

    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()
        self.type = "output"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "filename_prefix": ("STRING", {"default": "ComfyUI"}),
                "save_intermediate": ("BOOLEAN", {"default": False}),
            },
            "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},
        }

    RETURN_TYPES = ()
    FUNCTION = "save_images"

    OUTPUT_NODE = True

    CATEGORY = "mtb/IO"

    def create_image_grid(self, image_list):
        total_images = len(image_list)

        # Calculate the grid size based on the square root of the total number of images
        grid_size = (
            int(math.sqrt(total_images)),
            int(math.ceil(math.sqrt(total_images))),
        )

        # Get the size of the first image to determine the grid size
        image_width, image_height = image_list[0].size

        # Create a new blank image to hold the grid
        grid_width = grid_size[0] * image_width
        grid_height = grid_size[1] * image_height
        grid_image = Image.new("RGB", (grid_width, grid_height))

        # Iterate over the images and paste them onto the grid
        for i, image in enumerate(image_list):
            x = (i % grid_size[0]) * image_width
            y = (i // grid_size[0]) * image_height
            grid_image.paste(image, (x, y, x + image_width, y + image_height))

        return grid_image

    def save_images(
        self,
        images,
        filename_prefix="Grid",
        save_intermediate=False,
        prompt=None,
        extra_pnginfo=None,
    ):
        (
            full_output_folder,
            filename,
            counter,
            subfolder,
            filename_prefix,
        ) = folder_paths.get_save_image_path(
            filename_prefix,
            self.output_dir,
            images[0].shape[1],
            images[0].shape[0],
        )
        image_list = []
        batch_counter = counter

        metadata = PngInfo()
        if prompt is not None:
            metadata.add_text("prompt", json.dumps(prompt))
        if extra_pnginfo is not None:
            for x in extra_pnginfo:
                metadata.add_text(x, json.dumps(extra_pnginfo[x]))

        for idx, image in enumerate(images):
            i = 255.0 * image.cpu().numpy()
            img = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8))
            image_list.append(img)

            if save_intermediate:
                file = f"{filename}_batch-{idx:03}_{batch_counter:05}_.png"
                img.save(
                    os.path.join(full_output_folder, file),
                    pnginfo=metadata,
                    compress_level=4,
                )

            batch_counter += 1

        file = f"{filename}_{counter:05}_.png"
        grid = self.create_image_grid(image_list)
        grid.save(
            os.path.join(full_output_folder, file),
            pnginfo=metadata,
            compress_level=4,
        )

        results = [
            {"filename": file, "subfolder": subfolder, "type": self.type}
        ]
        return {"ui": {"images": results}}

```

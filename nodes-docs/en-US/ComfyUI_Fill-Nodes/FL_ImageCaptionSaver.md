---
tags:
- Image
- ImageSave
---

# FL Image Caption Saver
## Documentation
- Class name: `FL_ImageCaptionSaver`
- Category: `🏵️Fill Nodes`
- Output node: `False`

The FL_ImageCaptionSaver node is designed to save a batch of images along with their corresponding captions into specified directory, with options for file naming and overwrite control. It facilitates the organization and storage of generated images and textual descriptions, enhancing accessibility and management of visual content.
## Input types
### Required
- **`images`**
    - A batch of images to be saved. This input is crucial for determining the content that will be stored, directly affecting the output files created.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`folder_name`**
    - The name of the folder where images and captions will be saved. It serves as the destination path for the output, influencing the organization of saved files.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`caption_text`**
    - The text caption to be saved alongside each image. This input provides contextual or descriptive information about the images, enriching the content's value.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`overwrite`**
    - A boolean flag indicating whether existing files with the same name should be overwritten. This affects how the node handles file naming conflicts and storage management.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - A confirmation message detailing the number of images and captions saved and the directory where they are stored. It provides feedback on the operation's success.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FL_ImageCaptionSaver:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE", {}),
                "folder_name": ("STRING", {"default": "output_folder"}),
                "caption_text": ("STRING", {"default": "Your caption here"}),
                "overwrite": ("BOOLEAN", {"default": True})  # New overwrite toggle
            }
        }

    RETURN_TYPES = ("STRING",)
    FUNCTION = "save_images_with_captions"
    CATEGORY = "🏵️Fill Nodes"

    def save_images_with_captions(self, images, folder_name, caption_text, overwrite):
        # Ensure output directory exists
        os.makedirs(folder_name, exist_ok=True)

        saved_files = []
        for i, image_tensor in enumerate(images):
            base_name = f"image_{i}"
            image_file_name = f"{folder_name}/{base_name}.png"
            text_file_name = f"{folder_name}/{base_name}.txt"

            # Check if overwrite is disabled and file exists
            if not overwrite:
                counter = 1
                while os.path.exists(image_file_name) or os.path.exists(text_file_name):
                    image_file_name = f"{folder_name}/{base_name}_{counter}.png"
                    text_file_name = f"{folder_name}/{base_name}_{counter}.txt"
                    counter += 1

            # Convert tensor to image
            image = Image.fromarray((image_tensor.numpy() * 255).astype('uint8'), 'RGB')

            # Save image
            image.save(image_file_name)
            saved_files.append(image_file_name)

            # Save text file
            with open(text_file_name, "w") as text_file:
                text_file.write(caption_text)

        return (f"Saved {len(images)} images and captions in '{folder_name}'",)

```

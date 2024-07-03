
# Documentation
- Class name: FL_ImageCaptionSaver
- Category: 🏵️Fill Nodes
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

FL_ImageCaptionSaver节点旨在将一批图像及其相应的说明文字保存到指定目录中，并提供文件命名和覆盖控制选项。它有助于组织和存储生成的图像及其文本描述，从而提高视觉内容的可访问性和管理效率。

# Input types
## Required
- images
    - 需要保存的一批图像。这个输入对于确定将要存储的内容至关重要，直接影响创建的输出文件。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- folder_name
    - 用于保存图像和说明文字的文件夹名称。它作为输出的目标路径，影响已保存文件的组织方式。
    - Comfy dtype: STRING
    - Python dtype: str
- caption_text
    - 要与每张图像一起保存的文本说明。这个输入为图像提供上下文或描述性信息，丰富了内容的价值。
    - Comfy dtype: STRING
    - Python dtype: str
- overwrite
    - 一个布尔标志，指示是否应覆盖同名的现有文件。这影响节点如何处理文件命名冲突和存储管理。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- string
    - 一条确认消息，详细说明保存的图像和说明文字的数量以及存储它们的目录。它提供了操作成功的反馈。
    - Comfy dtype: STRING
    - Python dtype: str


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

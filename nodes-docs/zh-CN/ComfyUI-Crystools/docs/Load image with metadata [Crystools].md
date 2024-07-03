
# Documentation
- Class name: Load image with metadata [Crystools]
- Category: crystools 🪛/Image
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

这个节点旨在加载图像及其相关元数据，促进图像数据在更广泛的数据处理或分析工作流程中的集成和操作。它强调图像及其内在信息的无缝处理，旨在简化需要同时处理视觉和上下文数据的任务。

# Input types
## Required
- image
    - image参数代表要加载的目标图像文件。它对节点的操作至关重要，因为它决定了视觉内容和相关元数据的来源，这对后续的处理或分析至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 处理后的图像数据，可用于进一步的操作或分析。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - 从图像生成的掩码，用于需要区分图像区域的操作。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- prompt
    - 从图像元数据中提取的提示信息，提供与图像相关的上下文或指令。
    - Comfy dtype: JSON
    - Python dtype: str
- Metadata RAW
    - 与图像相关的综合元数据，封装了在加载过程中提取的所有上下文信息。
    - Comfy dtype: METADATA_RAW
    - Python dtype: dict


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CImageLoadWithMetadata:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        input_dir = folder_paths.get_input_directory()
        exclude_folders = ["clipspace"]
        file_list = []

        for root, dirs, files in os.walk(input_dir):
            # Exclude specific folders
            dirs[:] = [d for d in dirs if d not in exclude_folders]

            for file in files:
                relpath = os.path.relpath(os.path.join(root, file), start=input_dir)
                # fix for windows
                relpath = relpath.replace("\\", "/")
                file_list.append(relpath)

        return {
            "required": {
                "image": (sorted(file_list), {"image_upload": True})
            },
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.IMAGE.value
    RETURN_TYPES = ("IMAGE", "MASK", "JSON", "METADATA_RAW")
    RETURN_NAMES = ("image", "mask", "prompt", "Metadata RAW")
    OUTPUT_NODE = True

    FUNCTION = "execute"

    def execute(self, image):
        image_path = folder_paths.get_annotated_filepath(image)

        img, prompt, metadata = buildMetadata(image_path)

        img = ImageOps.exif_transpose(img)
        image = img.convert("RGB")
        image = np.array(image).astype(np.float32) / 255.0
        image = torch.from_numpy(image)[None,]
        if 'A' in img.getbands():
            mask = np.array(img.getchannel('A')).astype(np.float32) / 255.0
            mask = 1. - torch.from_numpy(mask)
        else:
            mask = torch.zeros((64, 64), dtype=torch.float32, device="cpu")

        return image, mask.unsqueeze(0), prompt, metadata

    @classmethod
    def IS_CHANGED(cls, image):
        image_path = folder_paths.get_annotated_filepath(image)
        m = hashlib.sha256()
        with open(image_path, 'rb') as f:
            m.update(f.read())
        return m.digest().hex()

    @classmethod
    def VALIDATE_INPUTS(cls, image):
        if not folder_paths.exists_annotated_filepath(image):
            return "Invalid image file: {}".format(image)

        return True

```

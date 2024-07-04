
# Documentation
- Class name: Image Sequence Loader [Dream]
- Category: ✨ Dream/🌄 image/🎥 animation
- Output node: False

Image Sequence Loader节点用于从指定目录加载一系列图像，通过应用模式和索引方法来选择图像。如果没有找到符合条件的图像，它还可以提供一个默认图像作为备选方案。

# Input types
## Required
- frame_counter
    - 表示当前帧计数器，用于根据图像在序列中的顺序确定要加载哪张图像。
    - Comfy dtype: FRAME_COUNTER
    - Python dtype: FrameCounter
- directory_path
    - 存储图像序列的目录路径。这使节点能够定位并加载图像。
    - Comfy dtype: STRING
    - Python dtype: str
- pattern
    - 用于匹配目录中文件名的模式，允许根据图像名称有选择地加载图像。
    - Comfy dtype: STRING
    - Python dtype: str
- indexing
    - 确定图像索引的方法，可以是数字顺序或字母顺序，用于建立序列顺序。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
## Optional
- default_image
    - 可选的默认图像，当目录中没有匹配指定模式和索引的图像时返回。
    - Comfy dtype: IMAGE
    - Python dtype: Image

# Output types
- image
    - 根据当前帧计数器从序列中加载的图像，如果没有找到匹配的图像则返回默认图像。
    - Comfy dtype: IMAGE
    - Python dtype: DreamImage
- frame_name
    - 从序列中加载的帧的名称，为图像提供上下文或标识。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamImageSequenceInputWithDefaultFallback:
    NODE_NAME = "Image Sequence Loader"
    ICON = "💾"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": SharedTypes.frame_counter | {
                "directory_path": ("STRING", {"default": '', "multiline": False}),
                "pattern": ("STRING", {"default": '*', "multiline": False}),
                "indexing": (["numeric", "alphabetic order"],)
            },
            "optional": {
                "default_image": ("IMAGE", {"default": None})
            }
        }

    CATEGORY = NodeCategories.IMAGE_ANIMATION
    RETURN_TYPES = ("IMAGE","STRING")
    RETURN_NAMES = ("image","frame_name")
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *values):
        return ALWAYS_CHANGED_FLAG

    def result(self, frame_counter: FrameCounter, directory_path, pattern, indexing, **other):
        default_image = other.get("default_image", None)
        entries = list_images_in_directory(directory_path, pattern, indexing == "alphabetic order")
        entry = entries.get(frame_counter.current_frame, None)
        if not entry:
            return (default_image, "")
        else:
            image_names = [os.path.basename(file_path) for file_path in entry]
            images = map(lambda f: DreamImage(file_path=f), entry)
            return (DreamImage.join_to_tensor_data(images), image_names[0]) 

```

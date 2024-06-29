# Documentation
- Class name: WAS_Image_History
- Category: WAS Suite/History
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_History 节点旨在管理和检索存储在 WASDatabase 中的历史图像。它提供访问和显示历史记录中的图像的功能，确保用户可以查看过去的图像状态或数据。

# Input types
## Required
- image
    - 'image' 参数对于指定用户想要访问的历史图像至关重要。节点使用它来定位并从数据库中检索正确的图像。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- image
    - 'image' 输出参数表示以张量形式检索到的历史图像，适用于进一步处理或显示目的。
    - Comfy dtype: COMBO[str, torch.Tensor]
    - Python dtype: Union[str, torch.Tensor]
- filename_text
    - 'filename_text' 输出参数提供检索到的图像的文件名，这对于记录、引用或额外的元数据目的非常有用。
    - Comfy dtype: str
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_History:

    def __init__(self):
        self.HDB = WASDatabase(WAS_HISTORY_DATABASE)
        self.conf = getSuiteConfig()

    @classmethod
    def INPUT_TYPES(cls):
        HDB = WASDatabase(WAS_HISTORY_DATABASE)
        conf = getSuiteConfig()
        paths = ['No History']
        if HDB.catExists('History') and HDB.keyExists('History', 'Images'):
            history_paths = HDB.get('History', 'Images')
            if conf.__contains__('history_display_limit'):
                history_paths = history_paths[-conf['history_display_limit']:]
                paths = []
            for path_ in history_paths:
                paths.append(os.path.join('...' + os.sep + os.path.basename(os.path.dirname(path_)), os.path.basename(path_)))
        return {'required': {'image': (paths,)}}
    RETURN_TYPES = ('IMAGE', TEXT_TYPE)
    RETURN_NAMES = ('image', 'filename_text')
    FUNCTION = 'image_history'
    CATEGORY = 'WAS Suite/History'

    def image_history(self, image):
        self.HDB = WASDatabase(WAS_HISTORY_DATABASE)
        paths = {}
        if self.HDB.catExists('History') and self.HDB.keyExists('History', 'Images'):
            history_paths = self.HDB.get('History', 'Images')
            for path_ in history_paths:
                paths.update({os.path.join('...' + os.sep + os.path.basename(os.path.dirname(path_)), os.path.basename(path_)): path_})
        if os.path.exists(paths[image]) and paths.__contains__(image):
            return (pil2tensor(Image.open(paths[image]).convert('RGB')), os.path.basename(paths[image]))
        else:
            cstr(f'The image `{image}` does not exist!').error.print()
            return (pil2tensor(Image.new('RGB', (512, 512), (0, 0, 0, 0))), 'null')

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float('NaN')
```
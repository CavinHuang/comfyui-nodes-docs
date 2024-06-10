# Documentation
- Class name: WAS_Load_Image
- Category: WAS Suite/IO
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Load_Image节点旨在高效地加载和处理来自指定路径或URL的图像。它处理图像转换为所需格式，并提供创建来自alpha通道的掩码和提取文件名等附加功能。

# Input types
## Required
- image_path
    - image_path参数至关重要，因为它决定了要加载的图像的来源。它可以是本地文件路径或在线图像的URL。此参数直接影响节点访问和处理图像数据的能力。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- RGBA
    - RGBA参数指定是否应加载带有alpha通道的图像。这会影响图像的透明度，对于某些图像处理任务可能非常重要。
    - Comfy dtype: ['false', 'true']
    - Python dtype: str
- filename_text_extension
    - filename_text_extension参数决定是否在文件名文本中包含文件扩展名。这对于需要特定命名约定的下游流程可能很重要。
    - Comfy dtype: ['true', 'false']
    - Python dtype: str

# Output types
- image
    - 图像输出提供已加载和处理的图像数据。它是任何后续图像分析或操作任务的基础输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - 掩码输出来源于图像的alpha通道（如果存在），用于区分图像中的透明区域。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- filename_text
    - filename_text输出是图像文件名的文本表示。它可以用于记录、显示或其他基于文本的操作。
    - Comfy dtype: TEXT_TYPE
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Load_Image:

    def __init__(self):
        self.input_dir = comfy_paths.input_directory
        self.HDB = WASDatabase(WAS_HISTORY_DATABASE)

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image_path': ('STRING', {'default': './ComfyUI/input/example.png', 'multiline': False}), 'RGBA': (['false', 'true'],)}, 'optional': {'filename_text_extension': (['true', 'false'],)}}
    RETURN_TYPES = ('IMAGE', 'MASK', TEXT_TYPE)
    RETURN_NAMES = ('image', 'mask', 'filename_text')
    FUNCTION = 'load_image'
    CATEGORY = 'WAS Suite/IO'

    def load_image(self, image_path, RGBA='false', filename_text_extension='true'):
        RGBA = RGBA == 'true'
        if image_path.startswith('http'):
            from io import BytesIO
            i = self.download_image(image_path)
        else:
            try:
                i = Image.open(image_path)
            except OSError:
                cstr(f"The image `{image_path.strip()}` specified doesn't exist!").error.print()
                i = Image.new(mode='RGB', size=(512, 512), color=(0, 0, 0))
        if not i:
            return
        update_history_images(image_path)
        image = i
        if not RGBA:
            image = image.convert('RGB')
        image = np.array(image).astype(np.float32) / 255.0
        image = torch.from_numpy(image)[None,]
        if 'A' in i.getbands():
            mask = np.array(i.getchannel('A')).astype(np.float32) / 255.0
            mask = 1.0 - torch.from_numpy(mask)
        else:
            mask = torch.zeros((64, 64), dtype=torch.float32, device='cpu')
        if filename_text_extension == 'true':
            filename = os.path.basename(image_path)
        else:
            filename = os.path.splitext(os.path.basename(image_path))[0]
        return (image, mask, filename)

    def download_image(self, url):
        try:
            response = requests.get(url)
            response.raise_for_status()
            img = Image.open(BytesIO(response.content))
            return img
        except requests.exceptions.HTTPError as errh:
            cstr(f'HTTP Error: ({url}): {errh}').error.print()
        except requests.exceptions.ConnectionError as errc:
            cstr(f'Connection Error: ({url}): {errc}').error.print()
        except requests.exceptions.Timeout as errt:
            cstr(f'Timeout Error: ({url}): {errt}').error.print()
        except requests.exceptions.RequestException as err:
            cstr(f'Request Exception: ({url}): {err}').error.print()

    @classmethod
    def IS_CHANGED(cls, image_path):
        if image_path.startswith('http'):
            return float('NaN')
        m = hashlib.sha256()
        with open(image_path, 'rb') as f:
            m.update(f.read())
        return m.digest().hex()
```
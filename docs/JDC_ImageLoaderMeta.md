# Documentation
- Class name: LoadImagePathWithMetadata
- Category: image
- Output node: False
- Repo Ref: https://github.com/Jordach/comfy-plasma.git

LoadImagePathWithMetadata节点旨在加载图像文件及其相关元数据。它能够处理本地和远程图像路径，从各种图像格式中提取提示和负面提示，并返回图像数据数组、掩码、提示、负面提示、宽度和高度。

# Input types
## Required
- image
    - 'image'参数是要处理的图像文件的路径。这是一个关键输入，因为节点的功能围绕从此路径加载和操作图像数据。图像可以是本地文件路径或远程图像的URL。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- image
    - 'image'输出是输入图像的加工版本，转换为适合进一步分析或操作的格式。它是节点输出的关键组成部分，为下游任务提供了必要的视觉数据。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - 如果可用，'mask'输出是从图像中提取的alpha通道，可用于分割目的。它代表了图像的透明度信息，特别适用于需要隔离背景的应用场景。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- prompt
    - 'prompt'输出包含嵌入在图像元数据中的任何积极或创造性的指令。这些信息可用于指导后续图像处理或生成任务，为图像的预期用途提供上下文。
    - Comfy dtype: STRING
    - Python dtype: str
- negative
    - 'negative'输出包括任何旨在指导远离某些图像特征或属性的指令。这对于通过指定应避免的内容来细化图像生成算法的输出特别有用。
    - Comfy dtype: STRING
    - Python dtype: str
- width
    - 'width'输出提供了加载图像的宽度，以像素为单位，这是了解图像尺寸和纵横比的基本信息。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 'height'输出给出了加载图像的高度，以像素为单位，与宽度相辅相成，以全面了解图像的尺寸。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class LoadImagePathWithMetadata:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('STRING', {'default': ''})}}
    CATEGORY = 'image'
    RETURN_TYPES = ('IMAGE', 'MASK', 'STRING', 'STRING', 'INT', 'INT')
    RETURN_NAMES = ('image', 'mask', 'PROMPT', 'NEGATIVE', 'WIDTH', 'HEIGHT')
    FUNCTION = 'load_image'

    def load_image(self, image):
        image_path = str(image)
        image_path = image_path.replace('"', '')
        i = None
        if image_path.startswith('http'):
            response = requests.get(image_path)
            i = Image.open(BytesIO(response.content)).convert('RGB')
        else:
            i = Image.open(image_path)
        prompt = ''
        negative = ''
        width = i.width
        height = i.height
        if i.format == 'PNG':
            if 'parameters' in i.info:
                params = i.info.get('parameters')
                (prompt, negative) = handle_auto1111(params)
            elif 'negative_prompt' in i.info or 'Negative Prompt' in i.info:
                params = str(i.info).replace("'", '"')
                (prompt, negative) = handle_ezdiff(params)
            elif 'sd-metadata' in i.info:
                (prompt, negative) = handle_invoke_modern(i.info)
            elif 'Dream' in i.info:
                (prompt, negative) = handle_invoke_legacy(i.info)
            elif i.info.get('Software') == 'NovelAI':
                (prompt, negative) = handle_novelai(i.info)
            elif 'XML:com.adobe.xmp' in i.info:
                (prompt, negative) = handle_drawthings(i.info)
        i = ImageOps.exif_transpose(i)
        image = i.convert('RGB')
        image = np.array(image).astype(np.float32) / 255.0
        image = torch.from_numpy(image)[None,]
        if 'A' in i.getbands():
            mask = np.array(i.getchannel('A')).astype(np.float32) / 255.0
            mask = 1.0 - torch.from_numpy(mask)
        else:
            mask = torch.zeros((64, 64), dtype=torch.float32, device='cpu')
        return (image, mask, prompt, negative, width, height)

    @classmethod
    def IS_CHANGED(s, image):
        image_path = str(image)
        image_path = image_path.replace('"', '')
        m = hashlib.sha256()
        if not image_path.startswith('http'):
            with open(image_path, 'rb') as f:
                m.update(f.read())
            return m.digest().hex()
        else:
            m.update(image.encode('utf-8'))
            return m.digest().hex()

    @classmethod
    def VALIDATE_INPUTS(s, image):
        image_path = str(image)
        image_path = image_path.replace('"', '')
        if image_path.startswith('http'):
            return True
        if not os.path.isfile(image_path):
            return 'No file found: {}'.format(image_path)
        return True
```
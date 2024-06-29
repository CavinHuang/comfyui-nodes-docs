# Documentation
- Class name: ImageReceiver
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ImageReceiver节点旨在处理和接收图像数据，提供解码、转换和准备图像数据的功能，以便在工作流中进行进一步分析或处理。它强调处理不同图像格式，并确保将图像数据正确转换为适合下游任务的格式。

# Input types
## Required
- image
    - 'image'参数对于节点至关重要，因为它指定了图像数据的来源。它可以是文件路径或对存储在其他地方的图像的引用。此参数直接影响节点检索和处理图像的能力。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- link_id
    - 'link_id'参数用作将图像数据与工作流中的其他元素链接或关联的标识符。其值可以从0到最大整数值，提供了在如何链接或引用图像方面的灵活性。
    - Comfy dtype: INT
    - Python dtype: int
- save_to_workflow
    - 'save_to_workflow'参数决定了是否应将图像数据保存为工作流的一部分以供将来使用。这对于跨工作流的不同阶段持久化数据而无需重新处理非常有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- image_data
    - 'image_data'参数包含编码后的图像数据，节点将对其进行解码和处理。它应该是表示base64编码图像内容的字符串，然后将其转换为可用的图像格式。
    - Comfy dtype: STRING
    - Python dtype: str
- trigger_always
    - 'trigger_always'参数是一个布尔标志，当设置为true时，表示节点应无条件地处理图像。这可以用来确保图像总是被处理，即使其他参数表明它可能不需要被处理。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- IMAGE
    - 'IMAGE'输出提供了以张量格式处理的图像数据，适用于工作流中的进一步分析或处理。它代表了ImageReceiver节点在图像数据成功解码和转换后的主要输出。
    - Comfy dtype: TENSOR
    - Python dtype: torch.Tensor
- MASK
    - 'MASK'输出是一个可选的张量，代表从图像数据派生的掩码。它可以用于分割或识别图像中感兴趣的特定区域的任务。
    - Comfy dtype: TENSOR
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ImageReceiver:

    @classmethod
    def INPUT_TYPES(s):
        input_dir = folder_paths.get_input_directory()
        files = [f for f in os.listdir(input_dir) if os.path.isfile(os.path.join(input_dir, f))]
        return {'required': {'image': (sorted(files),), 'link_id': ('INT', {'default': 0, 'min': 0, 'max': sys.maxsize, 'step': 1}), 'save_to_workflow': ('BOOLEAN', {'default': False}), 'image_data': ('STRING', {'multiline': False}), 'trigger_always': ('BOOLEAN', {'default': False, 'label_on': 'enable', 'label_off': 'disable'})}}
    FUNCTION = 'doit'
    RETURN_TYPES = ('IMAGE', 'MASK')
    CATEGORY = 'ImpactPack/Util'

    def doit(self, image, link_id, save_to_workflow, image_data, trigger_always):
        if save_to_workflow:
            try:
                image_data = base64.b64decode(image_data.split(',')[1])
                i = Image.open(BytesIO(image_data))
                i = ImageOps.exif_transpose(i)
                image = i.convert('RGB')
                image = np.array(image).astype(np.float32) / 255.0
                image = torch.from_numpy(image)[None,]
                if 'A' in i.getbands():
                    mask = np.array(i.getchannel('A')).astype(np.float32) / 255.0
                    mask = 1.0 - torch.from_numpy(mask)
                else:
                    mask = torch.zeros((64, 64), dtype=torch.float32, device='cpu')
                return (image, mask.unsqueeze(0))
            except Exception as e:
                print(f"[WARN] ComfyUI-Impact-Pack: ImageReceiver - invalid 'image_data'")
                mask = torch.zeros((64, 64), dtype=torch.float32, device='cpu')
                return (empty_pil_tensor(64, 64), mask)
        else:
            return nodes.LoadImage().load_image(image)

    @classmethod
    def VALIDATE_INPUTS(s, image, link_id, save_to_workflow, image_data, trigger_always):
        if image != '#DATA' and (not folder_paths.exists_annotated_filepath(image)) or image.startswith('/') or '..' in image:
            return 'Invalid image file: {}'.format(image)
        return True

    @classmethod
    def IS_CHANGED(s, image, link_id, save_to_workflow, image_data, trigger_always):
        if trigger_always:
            return float('NaN')
        elif save_to_workflow:
            return hash(image_data)
        else:
            return hash(image)
```
# Documentation
- Class name: LatentReceiver
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

LatentReceiver节点的'doit'方法负责处理潜在数据。它以潜在文件为输入，并输出表示潜在空间的张量。该节点对于处理潜在表示的转换和加载至关重要，这对于各种机器学习任务是必不可少的。

# Input types
## Required
- latent
    - 参数'latent'是潜在文件的文件路径，节点将处理该路径。它对节点的操作至关重要，因为它决定了要加载和用于后续计算的具体潜在数据。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- link_id
    - 参数'link_id'是用于跟踪或链接潜在数据的标识符。虽然不是必需的，但在更大的系统或工作流程中组织或引用数据时可能会很有用。
    - Comfy dtype: INT
    - Python dtype: int
- trigger_always
    - 参数'trigger_always'是一个布尔标志，当设置为true时，表示节点应始终触发其过程，而不考虑输入数据中的变化。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- result
    - 输出'result'是一个张量，代表处理后的潜在数据。它是节点的主要输出，并用于进一步分析或作为工作流中其他节点的输入。
    - Comfy dtype: TENSOR
    - Python dtype: torch.Tensor
- ui
    - 输出'ui'是一个字典，可能包含用于可视化目的的UI元素，如图像。它提供了一种以用户友好的格式呈现处理后数据的方式。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, List[str]]

# Usage tips
- Infra type: CPU

# Source code
```
class LatentReceiver:

    def __init__(self):
        self.input_dir = folder_paths.get_input_directory()
        self.type = 'input'

    @classmethod
    def INPUT_TYPES(s):

        def check_file_extension(x):
            return x.endswith('.latent') or x.endswith('.latent.png')
        input_dir = folder_paths.get_input_directory()
        files = [f for f in os.listdir(input_dir) if os.path.isfile(os.path.join(input_dir, f)) and check_file_extension(f)]
        return {'required': {'latent': (sorted(files),), 'link_id': ('INT', {'default': 0, 'min': 0, 'max': sys.maxsize, 'step': 1}), 'trigger_always': ('BOOLEAN', {'default': False, 'label_on': 'enable', 'label_off': 'disable'})}}
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'
    RETURN_TYPES = ('LATENT',)

    @staticmethod
    def load_preview_latent(image_path):
        if not os.path.exists(image_path):
            return None
        image = Image.open(image_path)
        exif_data = piexif.load(image.info['exif'])
        if piexif.ExifIFD.UserComment in exif_data['Exif']:
            compressed_data = exif_data['Exif'][piexif.ExifIFD.UserComment]
            compressed_data_io = BytesIO(compressed_data)
            with zipfile.ZipFile(compressed_data_io, mode='r') as archive:
                tensor_bytes = archive.read('latent')
            tensor = safetensors.torch.load(tensor_bytes)
            return {'samples': tensor['latent_tensor']}
        return None

    def parse_filename(self, filename):
        pattern = '^(.*)/(.*?)\\[(.*)\\]\\s*$'
        match = re.match(pattern, filename)
        if match:
            subfolder = match.group(1)
            filename = match.group(2).rstrip()
            file_type = match.group(3)
        else:
            subfolder = ''
            file_type = self.type
        return {'filename': filename, 'subfolder': subfolder, 'type': file_type}

    def doit(self, **kwargs):
        if 'latent' not in kwargs:
            return (torch.zeros([1, 4, 8, 8]),)
        latent = kwargs['latent']
        latent_name = latent
        latent_path = folder_paths.get_annotated_filepath(latent_name)
        if latent.endswith('.latent'):
            latent = safetensors.torch.load_file(latent_path, device='cpu')
            multiplier = 1.0
            if 'latent_format_version_0' not in latent:
                multiplier = 1.0 / 0.18215
            samples = {'samples': latent['latent_tensor'].float() * multiplier}
        else:
            samples = LatentReceiver.load_preview_latent(latent_path)
        if samples is None:
            samples = {'samples': torch.zeros([1, 4, 8, 8])}
        preview = self.parse_filename(latent_name)
        return {'ui': {'images': [preview]}, 'result': (samples,)}

    @classmethod
    def IS_CHANGED(s, latent, link_id, trigger_always):
        if trigger_always:
            return float('NaN')
        else:
            image_path = folder_paths.get_annotated_filepath(latent)
            m = hashlib.sha256()
            with open(image_path, 'rb') as f:
                m.update(f.read())
            return m.digest().hex()

    @classmethod
    def VALIDATE_INPUTS(s, latent, link_id, trigger_always):
        if not folder_paths.exists_annotated_filepath(latent) or latent.startswith('/') or '..' in latent:
            return 'Invalid latent file: {}'.format(latent)
        return True
```
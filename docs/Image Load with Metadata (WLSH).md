# Documentation
- Class name: WLSH_Read_Prompt
- Category: WLSH Nodes/image
- Output node: False
- Repo Ref: https://github.com/wallish77/wlsh_nodes

该节点旨在通过提取和解释嵌入的元数据来处理图像数据，其中包括指导图像生成过程的提示和其他参数。它在确保图像数据正确格式化并为系统中后续操作做好准备方面发挥着关键作用。

# Input types
## Required
- verbose
    - ‘verbose’参数控制输出信息的详细程度。当设置为‘true’时，它启用全面的节点操作日志记录，为调试和优化提供有价值的洞察。
    - Comfy dtype: COMBO[bool]
    - Python dtype: str
- image
    - ‘image’参数至关重要，因为它指定了节点将要处理的源图像文件。它直接影响后续步骤中使用的图像数据的质量和特性。
    - Comfy dtype: COMBO[str]
    - Python dtype: str

# Output types
- image
    - ‘image’输出是输入图像的预处理张量表示，准备在系统内进行进一步的操作和分析。它是所有后续与图像相关的操作的基础，是一个关键组成部分。
    - Comfy dtype: COMBO[torch.Tensor]
    - Python dtype: torch.Tensor
- positive
    - ‘positive’输出提供了与图像相关的积极提示，这对于理解图像生成过程的期望结果至关重要。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- negative
    - ‘negative’输出包含负面提示，概述了图像生成中要避免的方面。它对于引导生成朝预期方向发展至关重要。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- seed
    - ‘seed’输出表示用于生成过程的随机种子。它确保结果的可重复性和一致性，这对于实验和比较分析至关重要。
    - Comfy dtype: COMBO[int]
    - Python dtype: int
- steps
    - ‘steps’输出表示图像生成过程中所采取的迭代次数或步骤数。它影响最终输出的细节和精炼程度。
    - Comfy dtype: COMBO[int]
    - Python dtype: int
- cfg
    - ‘cfg’输出指的是调整图像生成设置的配置比例或参数。它在控制生成图像的整体风格和质量方面发挥着重要作用。
    - Comfy dtype: COMBO[float]
    - Python dtype: float
- width
    - ‘width’输出指定了生成图像的水平分辨率。它是决定图像的宽高比和整体尺寸的关键因素。
    - Comfy dtype: COMBO[int]
    - Python dtype: int
- height
    - ‘height’输出定义了图像的垂直分辨率。它与‘width’一起工作，以确定图像的最终大小和布局。
    - Comfy dtype: COMBO[int]
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class WLSH_Read_Prompt:

    @classmethod
    def INPUT_TYPES(s):
        input_dir = folder_paths.get_input_directory()
        files = [f for f in os.listdir(input_dir) if os.path.isfile(os.path.join(input_dir, f))]
        return {'required': {'verbose': (['true', 'false'],), 'image': (sorted(files), {'image_upload': True})}}
    CATEGORY = 'WLSH Nodes/image'
    ' Return order:\n        positive prompt(string), negative prompt(string), seed(int), steps(int), cfg(float), \n        width(int), height(int)\n    '
    RETURN_TYPES = ('IMAGE', 'STRING', 'STRING', 'INT', 'INT', 'FLOAT', 'INT', 'INT')
    RETURN_NAMES = ('image', 'positive', 'negative', 'seed', 'steps', 'cfg', 'width', 'height')
    FUNCTION = 'get_image_data'

    def get_image_data(self, image, verbose):
        image_path = folder_paths.get_annotated_filepath(image)
        with open(image_path, 'rb') as file:
            img = Image.open(file)
            extension = image_path.split('.')[-1]
            image = img.convert('RGB')
            image = np.array(image).astype(np.float32) / 255.0
            image = torch.from_numpy(image)[None,]
        parameters = ''
        comfy = False
        if extension.lower() == 'png':
            try:
                parameters = img.info['parameters']
                if not parameters.startswith('Positive prompt'):
                    parameters = 'Positive prompt: ' + parameters
            except:
                parameters = ''
                print('Error loading prompt info from png')
        elif extension.lower() in ('jpg', 'jpeg', 'webp'):
            try:
                exif = piexif.load(img.info['exif'])
                parameters = (exif or {}).get('Exif', {}).get(piexif.ExifIFD.UserComment, b'')
                parameters = piexif.helper.UserComment.load(parameters)
                if not parameters.startswith('Positive prompt'):
                    parameters = 'Positive prompt: ' + parameters
            except:
                try:
                    parameters = str(img.info['comment'])
                    comfy = True
                    parameters = parameters.replace('Positive Prompt', 'Positive prompt')
                    parameters = parameters.replace('Negative Prompt', 'Negative prompt')
                    parameters = parameters.replace('Start at Step', 'Start at step')
                    parameters = parameters.replace('End at Step', 'End at step')
                    parameters = parameters.replace('Denoising Strength', 'Denoising strength')
                except:
                    parameters = ''
                    print('Error loading prompt info from jpeg')
        if comfy and extension.lower() == 'jpeg':
            parameters = parameters.replace('\\n', ' ')
        else:
            parameters = parameters.replace('\n', ' ')
        patterns = ['Positive prompt: ', 'Negative prompt: ', 'Steps: ', 'Start at step: ', 'End at step: ', 'Sampler: ', 'Scheduler: ', 'CFG scale: ', 'Seed: ', 'Size: ', 'Model: ', 'Model hash: ', 'Denoising strength: ', 'Version: ', 'ControlNet 0', 'Controlnet 1', 'Batch size: ', 'Batch pos: ', 'Hires upscale: ', 'Hires steps: ', 'Hires upscaler: ', 'Template: ', 'Negative Template: ']
        if comfy and extension.lower() == 'jpeg':
            parameters = parameters[2:]
            parameters = parameters[:-1]
        keys = re.findall('|'.join(patterns), parameters)
        values = re.split('|'.join(patterns), parameters)
        values = [x for x in values if x]
        results = {}
        result_string = ''
        for item in range(len(keys)):
            result_string += keys[item] + values[item].rstrip(', ')
            result_string += '\n'
            results[keys[item].replace(': ', '')] = values[item].rstrip(', ')
        if verbose == 'true':
            print(result_string)
        try:
            positive = results['Positive prompt']
        except:
            positive = ''
        try:
            negative = results['Negative prompt']
        except:
            negative = ''
        try:
            seed = int(results['Seed'])
        except:
            seed = -1
        try:
            steps = int(results['Steps'])
        except:
            steps = 20
        try:
            cfg = float(results['CFG scale'])
        except:
            cfg = 8.0
        try:
            (width, height) = img.size
        except:
            (width, height) = (512, 512)
        ' Return order:\n            positive prompt(string), negative prompt(string), seed(int), steps(int), cfg(float), \n            width(int), height(int)\n        '
        return (image, positive, negative, seed, steps, cfg, width, height)

    @classmethod
    def IS_CHANGED(s, image, verbose):
        image_path = folder_paths.get_annotated_filepath(image)
        m = hashlib.sha256()
        with open(image_path, 'rb') as f:
            m.update(f.read())
        return m.digest().hex()

    @classmethod
    def VALIDATE_INPUTS(s, image, verbose):
        if not folder_paths.exists_annotated_filepath(image):
            return 'Invalid image file: {}'.format(image)
        return True
```
# Documentation
- Class name: WD14Tagger
- Category: image
- Output node: True
- Repo Ref: https://github.com/pythongosssss/ComfyUI-WD14-Tagger

该节点旨在对图像进行标记，使用指定的模型对输入的图像数据进行分类并返回相关标签。它通过处理批次中的每个图像，应用阈值来过滤标签，并尊重提供的任何排除标准。其主要目标是通过自动标记增强图像数据的组织和检索。

# Input types
## Required
- image
    - 图像参数至关重要，因为它提供了标记过程所需的原始数据。没有这个输入，节点无法执行其主要功能，即对图像进行分类和标记。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
- model
    - 模型参数至关重要，因为它决定了用于图像标记过程的具体机器学习模型。它影响生成的标签的准确性和相关性。
    - Comfy dtype: all_models
    - Python dtype: callable
- threshold
    - 阈值参数很重要，因为它设置了包含在输出中的标签的最小置信度水平。它直接影响标签的过滤，决定哪些被认为是足够重要的以被报告。
    - Comfy dtype: FLOAT
    - Python dtype: float
- character_threshold
    - 该参数通过为字符级标签设置一个特定的次级阈值来细化标记过程。它有助于过滤掉不太相关的字符标签，提高标记结果的精确度。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- exclude_tags
    - exclude_tags参数允许指定不应包含在输出中的标签。这对于根据特定要求定制标记结果或因各种原因避免某些标签非常有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- tags
    - 标签输出是图像标记过程的结果，包含基于输入图像和应用阈值的相关和重要标签的列表。它是关键的输出，因为它直接代表了节点的主要功能和标记过程的有效性。
    - Comfy dtype: STRING
    - Python dtype: List[str]

# Usage tips
- Infra type: CPU

# Source code
```
class WD14Tagger:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'model': (all_models,), 'threshold': ('FLOAT', {'default': defaults['threshold'], 'min': 0.0, 'max': 1, 'step': 0.05}), 'character_threshold': ('FLOAT', {'default': defaults['character_threshold'], 'min': 0.0, 'max': 1, 'step': 0.05}), 'exclude_tags': ('STRING', {'default': defaults['exclude_tags']})}}
    RETURN_TYPES = ('STRING',)
    OUTPUT_IS_LIST = (True,)
    FUNCTION = 'tag'
    OUTPUT_NODE = True
    CATEGORY = 'image'

    def tag(self, image, model, threshold, character_threshold, exclude_tags=''):
        tensor = image * 255
        tensor = np.array(tensor, dtype=np.uint8)
        pbar = comfy.utils.ProgressBar(tensor.shape[0])
        tags = []
        for i in range(tensor.shape[0]):
            image = Image.fromarray(tensor[i])
            tags.append(wait_for_async(lambda : tag(image, model, threshold, character_threshold, exclude_tags)))
            pbar.update(1)
        return {'ui': {'tags': tags}, 'result': (tags,)}
```
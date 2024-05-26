# Documentation
- Class name: RandomPrompt
- Category: ♾️Mixlab/Prompt
- Output node: True
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

RandomPrompt节点旨在通过组合可变和不可变文本元素生成多样化的提示集。它通过将提供的提示分割成单独的单词或短语，然后以各种组合重新组装它们来操作。该节点还提供了功能，可以基于指定的最大计数随机抽样一部分生成的提示，或返回所有提示。该过程旨在为进一步处理或分析创建广泛的文本输入。

# Input types
## Required
- max_count
    - 参数'max_count'确定要生成或抽样的最大提示数量。它在控制输出大小和确保节点的执行与所需的多样性水平一致，同时避免压垮下游流程中起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- mutable_prompt
    - 参数'mutable_prompt'是用户在节点操作期间可以更改或与其他提示组合的字符串。它之所以重要，是因为它构成了生成提示的可变性基础，允许广泛的潜在输出。
    - Comfy dtype: STRING
    - Python dtype: str
- immutable_prompt
    - 参数'immutable_prompt'是在节点执行期间保持不变的固定字符串。它作为一个常量元素，与可变提示合并，以在最终提示集中产生一致的结构。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- random_sample
    - 参数'random_sample'指示节点是否应随机选择生成提示的子集。启用时，它为选择过程引入了随机性元素，这对于需要多样化但有限的提示集的某些应用可能是有益的。
    - Comfy dtype: COMBO['enable', 'disable']
    - Python dtype: str
- seed
    - 参数'seed'用于初始化随机抽样过程中的随机数生成器。当提供特定的种子值时，它确保结果的可复现性，允许节点在多次执行中获得一致的结果。
    - Comfy dtype: any_type
    - Python dtype: int

# Output types
- prompts
    - 输出'prompts'是由可变和不可变文本元素组合生成的文本提示列表。它代表了节点执行的主要结果，对于使用这些提示进行进一步处理或分析的应用来说非常重要。
    - Comfy dtype: STRING
    - Python dtype: List[str]

# Usage tips
- Infra type: CPU

# Source code
```
class RandomPrompt:
    """
    @classmethod 是Python中的一个装饰器，用于将一个方法标记为类方法。
    类方法是与类相关联的方法，而不是与实例相关联的方法。
    这意味着类方法可以直接通过类进行调用，而不需要先创建一个类的实例。
    """

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'max_count': ('INT', {'default': 9, 'min': 1, 'max': 1000}), 'mutable_prompt': ('STRING', {'multiline': True, 'default': default_prompt1}), 'immutable_prompt': ('STRING', {'multiline': True, 'default': 'sticker, Cartoon, ``'}), 'random_sample': (['enable', 'disable'],)}, 'optional': {'seed': (any_type, {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('STRING',)
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Prompt'
    OUTPUT_IS_LIST = (True,)
    OUTPUT_NODE = True

    def run(self, max_count, mutable_prompt, immutable_prompt, random_sample, seed=0):
        words1 = mutable_prompt.split('\n')
        words2 = immutable_prompt.split('\n')
        pbar = comfy.utils.ProgressBar(len(words1) * len(words2))
        prompts = []
        for w1 in words1:
            w1 = w1.strip()
            for w2 in words2:
                w2 = w2.strip()
                if '``' not in w2:
                    if w2 == '':
                        w2 = '``'
                    else:
                        w2 = w2 + ',``'
                if w1 != '' and w2 != '':
                    prompts.append(w2.replace('``', w1))
                pbar.update(1)
        if len(prompts) == 0:
            prompts.append(immutable_prompt)
        if random_sample == 'enable':
            prompts = random.sample(prompts, min(max_count, len(prompts)))
        else:
            prompts = prompts[:min(max_count, len(prompts))]
        prompts = [elem.strip() for elem in prompts if elem.strip()]
        return {'ui': {'prompts': prompts}, 'result': (prompts,)}
```
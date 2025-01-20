document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const convertToBinaryButton = document.getElementById('convertToBinary');
    const binaryOutput = document.getElementById('binaryOutput');
    const loader = document.querySelector('.loader'); // Seleccionar el loader

    const inputBinary = document.getElementById('inputBinary');
    const convertToTextButton = document.getElementById('convertToText');
    const textOutput = document.getElementById('textOutput');

    const copyBinaryButton = document.getElementById('copyBinaryButton');

    const binaryModal = document.getElementById('binaryModal');
    const binaryModalText = document.getElementById('binaryModalText');

    function showModal(binaryText) {
        binaryModalText.textContent = `Número binario copiado: ${binaryText}`;
        binaryModal.style.display = 'flex'; 
        binaryModal.style.animation = 'fadeInOut 3s forwards';

        setTimeout(() => {
            binaryModal.style.display = 'none';
        }, 3000);
    }

    function textToBinary(text) {
        return text
            .split('')
            .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
            .join(' ');
    }

    function binaryToText(binary) {
        return binary
            .split(' ')
            .map(bin => String.fromCharCode(parseInt(bin, 2)))
            .join('');
    }

    convertToBinaryButton.addEventListener('click', () => {
        const text = inputText.value.trim();
        if (text) {
            binaryOutput.textContent = ''; 
            loader.style.display = 'inline-block'; 
            setTimeout(() => {
                try {
                    const binaryResult = textToBinary(text);
                    binaryOutput.textContent = binaryResult;
                    copyBinaryButton.style.display = 'inline-block';
                } catch (error) {
                    binaryOutput.textContent = 'Error: No se pudo convertir el texto a binario';
                    copyBinaryButton.style.display = 'none';
                } finally {
                    loader.style.display = 'none'; 
                }
            }, 1000); 
        } else {
            binaryOutput.textContent = 'Error: No se ingresó texto a convertir';
            copyBinaryButton.style.display = 'none';
        }
    });

    convertToTextButton.addEventListener('click', () => {
        const binary = inputBinary.value.trim();
        if (binary) {
            textOutput.textContent = '';
            loader.style.display = 'inline-block';
            setTimeout(() => {
                try {
                    const textResult = binaryToText(binary);
                    textOutput.textContent = textResult;
                } catch (error) {
                    textOutput.textContent = 'Error: No se pudo convertir el binario a texto';
                } finally {
                    loader.style.display = 'none';
                }
            }, 1000); 
        } else {
            textOutput.textContent = 'Error: No se ingresó binario a convertir';
        }
    });

    copyBinaryButton.addEventListener('click', () => {
        const binary = binaryOutput.textContent;
        if (binary) {
            navigator.clipboard.writeText(binary).then(() => {
                showModal(binary);
            }).catch(err => {
                alert('Hubo un error al copiar: ' + err);
            });
        }
    });
});

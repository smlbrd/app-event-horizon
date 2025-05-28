import React from 'react';

interface PasswordStrengthBarProps {
  value: string;
  minLength: number;
}

const orangeClr = '#f0a84b';
const greenClr = '#28a745';
const redClr = '#dc3545';
const darkClr = '#333';

const PasswordStrengthBar: React.FC<PasswordStrengthBarProps> = ({
  value,
  minLength = 15,
}) => {
  const maxLength = 128;
  const percent = Math.min((value.length / minLength) * 100, 100);

  let barColor = orangeClr;
  if (value.length >= minLength && value.length <= maxLength)
    barColor = greenClr;
  if (value.length > maxLength) barColor = redClr;

  return (
    <div style={{ width: '100%' }}>
      {value.length > 0 && (
        <>
          <div
            style={{
              fontSize: '0.95em',
              marginBottom: 1,
              color: value.length > maxLength ? redClr : darkClr,
            }}
          >
            Password must be between 15 - 128 characters
          </div>
          <div
            style={{
              width: '100%',
              height: 8,
              background: '#eee',
              borderRadius: 4,
              marginTop: 4,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                width: `${percent}%`,
                height: '100%',
                background: barColor,
                borderRadius: 4,
                transition: 'width 0.2s, background 0.2s',
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PasswordStrengthBar;

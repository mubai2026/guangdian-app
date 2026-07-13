import { useState } from 'react';
import { ArrowLeft, Lock, Check, Trophy, Gift, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../../components/GlassCard';
import { roleCards as initialCards, cardCollections, getCircleColor } from '../../mock/cardCollection';

export default function CardCollection() {
  const navigate = useNavigate();
  const [cards, setCards] = useState(initialCards);
  const [expandedSets, setExpandedSets] = useState<string[]>([]);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [completedCollection, setCompletedCollection] = useState<string | null>(null);

  const toggleSet = (setId: string) => {
    setExpandedSets(prev => 
      prev.includes(setId) 
        ? prev.filter(id => id !== setId)
        : [...prev, setId]
    );
  };

  const mockUnlock = (cardId: number) => {
    setCards(cards.map(c => 
      c.id === cardId ? { ...c, isUnlocked: true } : c
    ));

    const updatedCards = cards.map(c => 
      c.id === cardId ? { ...c, isUnlocked: true } : c
    );

    for (const collection of cardCollections) {
      const collectionCards = updatedCards.filter(c => c.circle === collection.circle);
      const allUnlocked = collectionCards.length > 0 && collectionCards.every(c => c.isUnlocked);
      
      if (allUnlocked && !collection.isCompleted) {
        setCompletedCollection(collection.id);
        setShowCompletedModal(true);
        break;
      }
    }
  };

  const handleClaimBonus = () => {
    setShowCompletedModal(false);
    setCompletedCollection(null);
  };

  return (
    <main className="mobile-page">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate('/c/profile')}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="page-title">卡片收藏</h1>
        <div className="header-placeholder" />
      </header>

      <section className="collection-sets">
        <div className="section-header">
          <h2 className="section-title">卡片合集</h2>
        </div>
        
        {cardCollections.map((set) => {
          const setCards = cards.filter(c => c.circle === set.circle);
          const setUnlocked = setCards.filter(c => c.isUnlocked).length;
          const setTotal = setCards.length;
          const isCompleted = setTotal > 0 && setUnlocked === setTotal;
          const isExpanded = expandedSets.includes(set.id);

          return (
            <GlassCard 
              key={set.id} 
              className={`collection-set-card ${isCompleted ? 'completed' : ''}`}
            >
              <div 
                className="collection-set-header" 
                onClick={() => toggleSet(set.id)}
              >
                <div className="collection-set-icon" style={{ background: `${getCircleColor(set.circle)}20` }}>
                  {isCompleted ? (
                    <Trophy size={20} color={getCircleColor(set.circle)} />
                  ) : (
                    <Gift size={20} color={getCircleColor(set.circle)} />
                  )}
                </div>
                <div className="collection-set-info">
                  <h3 className="collection-set-name">{set.name}</h3>
                  <p className="collection-set-desc">{set.description}</p>
                </div>
                <div className="collection-set-arrow">
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>
              
              <div className="collection-set-progress">
                <span className="collection-set-progress-text">{setUnlocked}/{setTotal}</span>
                <div className="collection-set-progress-bar">
                  <div 
                    className="collection-set-progress-fill" 
                    style={{ width: `${setTotal > 0 ? (setUnlocked / setTotal) * 100 : 0}%` }} 
                  />
                </div>
              </div>
              
              <div className="collection-set-bonus">
                <Gift size={16} color="#FF7A45" />
                <span className="collection-set-bonus-text">
                  {isCompleted ? '已领取' : `奖励: ${set.bonusValue}`}
                </span>
              </div>

              {isExpanded && (
                <div className="collection-set-cards">
                  <div className="collection-grid">
                    {setCards.map(card => (
                      <GlassCard 
                        key={card.id} 
                        className={`collection-card ${card.isUnlocked ? 'unlocked' : 'locked'}`}
                        onClick={() => !card.isUnlocked && mockUnlock(card.id)}
                      >
                        <div className="collection-card-icon" style={{ background: card.isUnlocked ? `${getCircleColor(card.circle)}15` : '#f0f0f2' }}>
                          {card.isUnlocked ? (
                            <Check size={24} style={{ color: getCircleColor(card.circle) }} />
                          ) : (
                            <Lock size={20} style={{ color: '#C7C7CC' }} />
                          )}
                        </div>
                        <h3 className="collection-card-name">{card.name}</h3>
                        <span className="collection-card-circle" style={{ background: `${getCircleColor(card.circle)}15`, color: getCircleColor(card.circle) }}>
                          {card.circle}
                        </span>
                        <p className="collection-card-desc">{card.description}</p>
                        {!card.isUnlocked && (
                          <div className="collection-card-tip">
                            <Lock size={12} style={{ color: '#9CA3AF' }} />
                            <span>{card.unlockCondition}</span>
                          </div>
                        )}
                        {card.isUnlocked && card.rarity !== 'common' && (
                          <span className={`rarity-tag ${card.rarity}`}>
                            {card.rarity === 'rare' ? '稀有' : '史诗'}
                          </span>
                        )}
                      </GlassCard>
                    ))}
                  </div>
                </div>
              )}
            </GlassCard>
          );
        })}
      </section>

      {showCompletedModal && (
        <div className="modal-overlay" onClick={() => setShowCompletedModal(false)}>
          <div className="modal-content collection-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon completed">
              <Trophy size={48} />
            </div>
            <h3 className="modal-title">合集完成!</h3>
            <p className="modal-desc">恭喜你收集齐了所有卡片</p>
            <div className="modal-bonus">
              <Gift size={24} />
              <span>获得奖励: {cardCollections.find(c => c.id === completedCollection)?.bonusValue}</span>
            </div>
            <button className="primary-btn" onClick={handleClaimBonus}>
              领取奖励
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
